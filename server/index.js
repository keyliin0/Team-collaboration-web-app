const express = require("express");
const app = express();
const cookiesession = require("cookie-session");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

// models
require("./models/users");

//db
mongoose.connect(keys.mongodbURI);

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

// config
const PORT = process.env.PORT || 5000;
app.listen(PORT);
