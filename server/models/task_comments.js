const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskCommentSchema = new Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: "tasks" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  comment: String,
  timestamp: Number
});

mongoose.model("task_comments", TaskCommentSchema);
