const mongoose = require("mongoose");
const RequireLogin = require("../middlewares/RequireLogin");
const Calendar = mongoose.model("calendar");

module.exports = app => {
  app.post("/api/calendar/create", RequireLogin, async (req, res) => {
    const event = new Calendar({
      group_id: req.body.group_id,
      title: req.body.title,
      description: req.body.description,
      timestamp: req.body.timestamp,
      month: req.body.month,
      year: req.body.year
    });
    await event.save();
    res.send(event);
  });
  app.get(
    "/api/calendar/fetch/:group_id/:month/:year",
    RequireLogin,
    async (req, res) => {
      const events = await Calendar.find({
        group_id: req.params.group_id,
        month: req.params.month,
        year: req.params.year
      });
      res.send(events);
    }
  );
  app.post("/api/calendar/remove", RequireLogin, async (req, res) => {
    await Calendar.findByIdAndRemove(req.body.event_id);
    res.send(true);
  });
  app.post("/api/calendar/modify", RequireLogin, async (req, res) => {
    const event = await Calendar.findByIdAndUpdate(
      req.body.event_id,
      {
        title: req.body.title,
        description: req.body.description,
        timestamp: req.body.timestamp,
        month: req.body.month,
        year: req.body.year
      },
      { new: true }
    );
    res.send(event);
  });
};
