const mongoose = require("mongoose");
const RequireLogin = require("../middlewares/RequireLogin");
const Notification = mongoose.model("notifications");

module.exports = app => {
  //fetch notifications
  app.get(
    "/api/notifications/get/:skip/:limit",
    RequireLogin,
    async (req, res) => {
      const notifications = await Notification.find({
        user_id: req.user._id
      })
        .limit(parseInt(req.params.limit))
        .skip(parseInt(req.params.skip))
        .populate("author", "id firstname lastname imgURL")
        .sort("-timestamp");
      res.send(notifications);
    }
  );
  app.post("/api/notifications/mark_read/", RequireLogin, async (req, res) => {
    const notification = await Notification.findByIdAndUpdate(
      req.body.notification_id,
      { seen: true },
      { new: true }
    );
    res.send(notification);
  });
};
