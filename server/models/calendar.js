const mongoose = require("mongoose");
const { Schema } = mongoose;

const CalendarSchema = new Schema({
  group_id: String,
  title: String,
  description: String,
  timestamp: Number,
  month: Number,
  year: Number
});

mongoose.model("calendar", CalendarSchema);
