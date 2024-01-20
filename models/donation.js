const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    totalDonors: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model("donations", donationSchema);

module.exports = Donation;
