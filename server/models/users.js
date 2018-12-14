const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    googleId: String,
    firstname: String,
    lastname: String,
    refreshkey: String,
    accesskey: String,
    LastRefreshed: Number,
    imgURL: String,
    _groups: [{ type: Schema.Types.ObjectId, ref: "groups" }]
  },
  { usePushEach: true }
);

mongoose.model("users", UserSchema);
