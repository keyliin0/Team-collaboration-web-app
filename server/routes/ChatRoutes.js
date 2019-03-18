const mongoose = require("mongoose");
const RequireLogin = require("../middlewares/RequireLogin");
const Chat = mongoose.model("chat");

module.exports = app => {
  //fetch messages
  app.get(
    "/api/chat/fetch/:group_id/:skip/:limit",
    RequireLogin,
    async (req, res) => {
      const messages = await Chat.find({
        group_id: req.params.group_id
      })
        .limit(parseInt(req.params.limit))
        .skip(parseInt(req.params.skip))
        .populate("author", "id firstname lastname imgURL")
        .sort("-timestamp");
      messages.reverse();
      res.send(messages);
    }
  );
};
