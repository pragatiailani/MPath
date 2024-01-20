const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donationAmount: {
      type: Number,
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
