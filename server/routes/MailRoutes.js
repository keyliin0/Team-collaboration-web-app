const RequireLogin = require("../middlewares/RequireLogin");
const CheckToken = require("../middlewares/CheckToken");
const axios = require("axios");
var batchelor = require("batchelor");
const base64url = require("base64url");
const mainURL = "https://www.googleapis.com/gmail/v1/users/";

module.exports = app => {
  // get messages
  app.get(
    "/api/mail/messages/:label/:nextpage",
    RequireLogin,
    CheckToken,
    async (req, res) => {
      try {
        console.log(req.params.label);
        console.log(req.params.nextpage);
        const URL = mainURL + req.user.googleId + "/messages";
        const token =
          "?access_token=" +
          req.user.accesskey +
          "&maxResults=25" +
          "&labelIds=" +
          req.params.label +
          (req.params.nextpage !== "default"
            ? "&pageToken=" + req.params.nextpage
            : "");
        const request = await axios.get(URL + token);
        if (request.data.resultSizeEstimate === 0) {
          res.send(request.data);
          return;
        }
        console.log(request.data);
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
            path:
              "/gmail/v1/users/" + req.user.googleId + "/messages/" + message.id
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
              //console.log(from);
              from = from.split("<");
              // console.log(data.body.payload.parts[1].body.data);
              var is_read = true;
              data.body.labelIds.forEach(label => {
                if (label === "UNREAD") is_read = false;
              });
              try {
                const email = {
                  id: data.body.id,
                  name: from[0],
                  from: from[from.length - 1].split(">")[0],
                  date: date,
                  subject: subject,
                  content: !data.body.payload.parts
                    ? base64url.decode(data.body.payload.body.data)
                    : base64url.decode(data.body.payload.parts[1].body.data),
                  is_read: is_read
                };
                emails.push(email);
              } catch (err) {
                //console.log(err);
              }
            });
            // console.log(response.parts[0].body.payload);
            //console.log(response.parts[0].body.payload);
            res.send({
              messages: emails,
              nextpage: request.data.nextPageToken
            });
            batch.reset();
          }
        });
      } catch (err) {
        res.status(500).send(err);
      }
    }
  );
  // delete a message
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
      res.status(500).send(err);
    }
  });
  // modify a message
  app.post("/api/mail/modify", RequireLogin, CheckToken, async (req, res) => {
    try {
      console.log(req.body);
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
      res.send("emails deleted");
      console.log(request);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  // send a message
  app.post("/api/mail/send", RequireLogin, CheckToken, async (req, res) => {
    const { content, receiver } = req.body;
    const to = "To: " + receiver;
    const from = "From: me";
    const subject = "Subject: " + req.body.subject;
    const contentType = "Content-Type: text/html; charset=utf-8";
    const mime = "MIME-Version: 1.0";
    var message = "";
    message += to + "\r\n";
    message += from + "\r\n";
    message += subject + "\r\n";
    message += contentType + "\r\n";
    message += mime + "\r\n";
    message += "\r\n" + content;
    message = base64url.encode(message);
    try {
      await axios.post(
        "https://www.googleapis.com/gmail/v1/users/" +
          req.user.googleId +
          "/messages/send?access_token=" +
          req.user.accesskey,
        { raw: message }
      );
      res.send("success");
    } catch (err) {
      res.send(err);
    }
  });
};
