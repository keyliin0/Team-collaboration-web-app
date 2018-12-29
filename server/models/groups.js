const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupSchema = new Schema(
  {
    name: String,
    imgURL: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    facebook: { type: String, default: "" },
    email: { type: String, default: "" },
    _creator: { type: Schema.Types.ObjectId, ref: "users" },
    _users: [{ type: Schema.Types.ObjectId, ref: "users" }],
    invitation_code: { type: String, default: "" }
  },
  { usePushEach: true }
);

mongoose.model("groups", GroupSchema);
