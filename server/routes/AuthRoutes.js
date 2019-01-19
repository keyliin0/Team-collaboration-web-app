const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "profile",
        "email",
        "https://mail.google.com/",
        "https://www.googleapis.com/auth/gmail.modify",
        "https://www.googleapis.com/auth/gmail.compose",
        "https://www.googleapis.com/auth/gmail.send"
      ],
      prompt: "consent",
      accessType: "offline"
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      req.session.user = req.user;
      res.redirect("/");
    }
  );
  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      user = req.user;
      res.send({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        imgURL: user.imgURL
      });
    } else res.send(null);
  });
};
