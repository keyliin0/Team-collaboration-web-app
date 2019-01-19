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

/* ___ Mail Routes _____ */
require("./routes/AuthRoutes")(app);
require("./routes/MailRoutes")(app);

/* ____ Group routes _____ */
require("./routes/GroupRoutes")(app);

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
  let cookieString = socket.request.headers.cookie;
  const req = { headers: { cookie: cookieString } };
  var user;
  cookiesession({ keys: [keys.cookiekey] })(req, {}, () => {
    user = req.session.user;
  });
  socket.on("CreateChatMessage", (room, message) => {
    const data = {
      sender_id: user._id,
      name: user.firstname,
      lastname: user.lastname,
      message: message,
      userIMG: user.imgURL,
      time: Date.now()
    };
    chatExchange.publish(room, data);
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
});
