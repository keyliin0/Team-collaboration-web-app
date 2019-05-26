const mongoose = require("mongoose");
const RequireLogin = require("../middlewares/RequireLogin");
const Task = mongoose.model("tasks");
const TaskComment = mongoose.model("task_comments");

module.exports = app => {
  app.post("/api/tasks/create_task", RequireLogin, async (req, res) => {
    const task = new Task({
      group_id: req.body.group_id,
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      _users: []
    });
    await task.save();
    res.send(task);
  });
  app.post("/api/tasks/add_users", RequireLogin, async (req, res) => {
    const task = Task.findByIdAndUpdate(
      req.body.task_id,
      { _users: req.body.users },
      { new: true }
    );
    await task.save();
    res.send(task);
  });
  app.post("/api/tasks/create_comment", RequireLogin, async (req, res) => {
    const comment = new TaskComment({
      task_id: req.body.task_id,
      author: req.user.id,
      comment: req.body.comment,
      timestamp: Date.now()
    });
    await comment.save();
    res.send(comment);
  });
  app.get("/api/tasks/fetch/:group_id", RequireLogin, async (req, res) => {
    const task = await Task.find({ group_id: req.params.group_id }).populate(
      "_users",
      "id firstname lastname imgURL"
    );
    res.send(task);
  });
  app.get(
    "/api/tasks/fetch_comments/:task_id",
    RequireLogin,
    async (req, res) => {
      const comment = await TaskComment.find({
        task_id: req.params.task_id
      }).populate("author", "firstname lastname imgURL");
      res.send(comment);
    }
  );
  app.post("/api/tasks/remove", RequireLogin, async (req, res) => {
    await Task.findByIdAndRemove(mongoose.Types.ObjectId(req.body.task_id));
    res.send(null);
  });
};
