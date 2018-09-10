const RequireLogin = require("../middlewares/RequireLogin");
const CheckToken = require("../middlewares/CheckToken");
const axios = require("axios");
var batchelor = require("batchelor");
const mainURL = "https://www.googleapis.com/gmail/v1/users/";
const base64url = require("base64url");

module.exports = app => {
  app.post("/api/mail/messages", RequireLogin, CheckToken, async (req, res) => {
    const URL = mainURL + req.user.googleId + "/messages";
    const token =
      "?access_token=" +
      req.user.accesskey +
      "&maxResults=20" +
      "&labelIds=" +
      req.body.label +
      (req.body.NextPage ? "&pageToken=" + req.body.NextPage : "");
    const request = await axios.get(URL + token);
    var batch = new batchelor({
      uri: "https://www.googleapis.com/batch",
      method: "POST",
      auth: {
        bearer: req.user.accesskey
      },
      headers: {
        "Content-Type": "multipart/mixed"
      }
    });
    request.data.messages.forEach(message => {
      batch.add({
        method: "GET",
        path: "/gmail/v1/users/" + req.user.googleId + "/messages/" + message.id
      });
    });
    const emails = [];
    batch.run((err, response) => {
      if (err) {
        console.log("Error: " + err.toString());
      } else {
        response.parts.forEach(data => {
          var subject, name, from, content, date;
          data.body.payload.headers.forEach(header => {
            switch (header.name) {
              case "From":
                from = header.value;
                break;
              case "Subject":
                subject = header.value;
                break;
              case "Date":
                date = header.value;
                break;
              default:
                break;
            }
          });
          console.log(from);
          from = from.split("<");
          const email = {
            id: data.body.id,
            name: from[0],
            from: from[from.length - 1].split(">")[0],
            date: date,
            subject: subject,
            content: !data.body.payload.parts
              ? base64url.decode(data.body.payload.body.data)
              : base64url.decode(data.body.payload.parts[1].body.data)
          };
          emails.push(email);
        });
        // console.log(response.parts[0].body.payload);
        //console.log(response.parts[0].body.payload);
        res.send(emails);
        batch.reset();
      }
    });
  });
  app.post("/api/mail/delete", RequireLogin, CheckToken, async (req, res) => {
    try {
      const request = await axios.post(
        mainURL +
          req.user.googleId +
          "/messages/batchDelete?access_token=" +
          req.user.accesskey,
        { ids: req.body.ids }
      );
      res.send(request.data);
    } catch (err) {
      res.status(401).send("error");
    }
  });
  app.post("/api/mail/modify", RequireLogin, CheckToken, async (req, res) => {
    try {
      const request = await axios.post(
        mainURL +
          req.user.googleId +
          "/messages/batchModify?access_token=" +
          req.user.accesskey,
        {
          ids: req.body.ids,
          addLabelIds: req.body.addlabels,
          removeLabelIds: req.body.removelabels
        }
      );
      res.send(request.data);
    } catch (err) {
      res.status(401).send("error");
    }
  });
};
