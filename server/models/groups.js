const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupSchema = new Schema({
  name: String,
  imgURL: String,
  _creator: { type: Schema.Types.ObjectId, ref: "users" },
  _users: [{ type: Schema.Types.ObjectId, ref: "users" }]
});

mongoose.model("groups", GroupSchema);
