const express = require("express");
const app = express();
const cookiesession = require("cookie-session");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const redis = require("socket.io-redis");
const amqp = require("amqp");
const _ = require("lodash");

// models
require("./models/users");
require("./models/groups");
require("./models/chat");
require("./models/calendar");
require("./models/tasks");
require("./models/task_comments");
require("./models/notifications");
//db
mongoose.connect(keys.mongodbURI);
// rabbitmq
const rabbitConn = amqp.createConnection({
  url: keys.amqpURL
});
rabbitConn.on("ready", function() {
  chatExchange = rabbitConn.exchange("chatExchange");
  NotificationExchange = rabbitConn.exchange("NotificationExchange");
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
require("./routes/TaskRoutes")(app);
require("./routes/FilesRoutes")(app);
require("./routes/NotificationsRoute")(app);

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
  /* grab the cookie for the user informations */
  let cookieString = socket.request.headers.cookie;
  const req = { headers: { cookie: cookieString } };
  var user;
  cookiesession({ keys: [keys.cookiekey] })(req, {}, async () => {
    // for demo account
    if (req.session.passport.user) {
      const User = mongoose.model("users");
      const ObjectId = require("mongoose").Types.ObjectId;
      user = await User.findById(ObjectId(req.session.passport.user));
    } else user = req.session.user;
    socket.on("join", room => {
      socket.join(room);
      // chat queue
      rabbitConn.queue("", { exclusive: true }, function(q) {
        //Bind to chatExchange w/ "#" or "" binding key to listen to all messages.
        q.bind("chatExchange", room + "/chat");
        q.bind("NotificationExchange", room + "/notification");
        //Subscribe When a message comes, send it back to browser
        q.subscribe(function(message) {
          switch (message.type) {
            case "CHAT":
              socket.emit("NewMessage", message.data);
              return;
            case "NOTIFICATION":
              if (message.data[user._id])
                socket.emit("NewNotification", message.data[user._id]);
            default:
              return;
          }
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
      chatExchange.publish(room + "/chat", { data: data, type: "CHAT" });
      const Group = mongoose.model("groups");
      await Group.findByIdAndUpdate(room, {
        last_chat_message: {
          message: message,
          timestamp: Date.now()
        }
      });
    });
    socket.on("CreateNotification", async (room, type) => {
      const Group = mongoose.model("groups");
      const group = await Group.findById(room);
      const Notification = mongoose.model("notifications");
      const notifications = [];
      var title;
      switch (type) {
        case "MODIFY_TASK":
          title = "A task was modified in " + group.name;
          break;
        case "ADD_TASK":
          title = "A task was added in " + group.name;
          break;
        case "MODIFY_EVENT":
          title = "An event was modified  in " + group.name;
          break;
        case "ADD_EVENT":
          title = "An event was added in " + group.name;
          break;
        default:
          break;
      }
      group._users.forEach(user_id => {
        if (user._id == user_id) return; // don't store notification for the user who made an action
        notifications.push(
          new Notification({
            title: title,
            user_id: user_id,
            group_id: group._id,
            seen: false,
            type: type,
            timestamp: Date.now()
          })
        );
      });
      await Notification.insertMany(notifications);
      NotificationExchange.publish(room + "/notification", {
        data: _.mapKeys(notifications, "user_id"),
        type: "NOTIFICATION"
      }); // send user_id to skip his own notification
    });
  });
});
