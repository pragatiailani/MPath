const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  maxVolunteers: { type: Number },
  currentVolunteers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    delfault: [],
  },
});

const Event = mongoose.model("events", eventSchema);

module.exports = Event;
