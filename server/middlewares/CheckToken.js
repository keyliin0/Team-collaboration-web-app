// check if the token expired or will expire sooner
const axios = require("axios");
const keys = require("../config/keys");

module.exports = async (req, res, next) => {
  const now = new Date().getTime();
  if (now - req.user.LastRefreshed > 3000) {
    const request = await axios.post(
      "https://www.googleapis.com/oauth2/v4/token",
      {
        refresh_token: req.user.refreshkey,
        client_id: keys.googleClientId,
        client_secret: keys.googleClientSecret,
        grant_type: "refresh_token"
      }
    );
    newkey = request.data.access_token;
    req.user.accesskey = newkey;
    req.user.LastRefreshed = now;
    req.user.save();
  }
  next();
};
