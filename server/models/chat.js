const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatSchema = new Schema({
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: "groups" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  message: String,
  timestamp: Number
});

mongoose.model("chat", ChatSchema);
