const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "organizerModel",
      required: true,
    },
    organizerModel: {
      type: String,
      required: true,
      enum: ["user", "organisation", "company"],
    },
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    eventType: { type: String, enum: ["donation", "normal"], required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    maxVolunteers: { type: Number },
    currentVolunteers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      delfault: [],
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("events", eventSchema);

module.exports = Event;
