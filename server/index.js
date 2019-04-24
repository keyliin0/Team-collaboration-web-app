const express = require("express");
const app = express();
const cookiesession = require("cookie-session");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const redis = require("socket.io-redis");
var amqp = require("amqp");

// models
require("./models/users");
require("./models/groups");
require("./models/chat");
require("./models/calendar");
//db
mongoose.connect(keys.mongodbURI);
// rabbitmq
const rabbitConn = amqp.createConnection({
  url: keys.amqpURL
});
rabbitConn.on("ready", function() {
  chatExchange = rabbitConn.exchange("chatExchange");
});
rabbitConn.on("error", function(e) {
  console.log("Error from amqp: ", e);
});

// middlewares
app.use(bodyParser.json());

app.use(
  cookiesession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookiekey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// services
require("./services/passport");

// routes

require("./routes/AuthRoutes")(app);
require("./routes/MailRoutes")(app);
require("./routes/ChatRoutes")(app);
require("./routes/GroupRoutes")(app);
require("./routes/CalendarRoutes")(app);

// config
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);
const io = socket(server);

//io.adapter(redis({ host: "localhost", port: 6379 }));
io.on("connection", socket => {
  console.log("aa");
  /* grab the cookie for the user informations */
  let cookieString = socket.request.headers.cookie;
  const req = { headers: { cookie: cookieString } };
  var user;
  cookiesession({ keys: [keys.cookiekey] })(req, {}, () => {
    user = req.session.user;
  });
  socket.on("join", room => {
    socket.join(room);
    rabbitConn.queue(room, {}, function(q) {
      //Bind to chatExchange w/ "#" or "" binding key to listen to all messages.
      q.bind("chatExchange", room);

      //Subscribe When a message comes, send it back to browser
      q.subscribe(function(data) {
        io.in(room).emit("NewMessage", data);
      });
    });
  });
  socket.on("CreateChatMessage", async (room, message) => {
    // room = group_id
    var data = {
      author: user._id,
      group_id: room,
      message: message,
      timestamp: Date.now()
    };
    const Chat = mongoose.model("chat");
    const Message = new Chat(data);
    Message.save();
    data._id = Message.id;
    data.author = {
      _id: user._id,
      imgURL: user.imgURL,
      firstname: user.firstname,
      lastname: user.lastname
    };
    console.log(data);
    chatExchange.publish(room, data);
    const Group = mongoose.model("groups");
    await Group.findByIdAndUpdate(room, {
      last_chat_message: {
        message: message,
        timestamp: Date.now()
      }
    });
  });
});
