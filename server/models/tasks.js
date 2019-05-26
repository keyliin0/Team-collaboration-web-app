const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    group_id: { type: Schema.Types.ObjectId, ref: "groups" },
    name: String,
    description: String,
    type: String,
    _users: [{ type: Schema.Types.ObjectId, ref: "users" }]
  },
  { usePushEach: true }
);

mongoose.model("tasks", TaskSchema);
