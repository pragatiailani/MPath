const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  rating: { type: Number, required: true },
  comment: { type: String },
});

const Feedback = mongoose.model("feedbacks", feedbackSchema);

module.exports = Feedback;
