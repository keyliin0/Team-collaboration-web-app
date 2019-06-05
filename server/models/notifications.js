const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  title: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: "groups" },
  seen: Boolean,
  type: String,
  timestamp: Number
});

mongoose.model("notifications", NotificationSchema);
