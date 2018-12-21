const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: String,
  firstname: String,
  lastname: String,
  refreshkey: String,
  accesskey: String,
  LastRefreshed: Number,
  imgURL: String,
  _groups: [{ type: Schema.Types.ObjectId, ref: "groups" }]
});

const GroupSchema = new Schema({
  name: String,
  imgURL: { type: String, default: "" },
  instagram: { type: String, default: "" },
  twitter: { type: String, default: "" },
  facebook: { type: String, default: "" },
  email: { type: String, default: "" },
  _creator: { type: Schema.Types.ObjectId, ref: "users" },
  _users: [{ type: Schema.Types.ObjectId, ref: "users" }]
});

mongoose.model("groups", GroupSchema);
