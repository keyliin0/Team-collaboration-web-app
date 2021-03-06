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
    invitation_code: { type: String, default: "" },
    last_chat_message: {
      message: { type: String, default: "Be the first to write a message!" },
      timestamp: { type: Number, default: Date.now() }
    },
    storage_folder_id: { type: String }
  },
  { usePushEach: true }
);

mongoose.model("groups", GroupSchema);
