const Feedback = require("../models/feedback");
const { validateToken } = require("../services/authentication");

function handleGetFeedbackUI(req, res) {
  const eventId = req.params.id;
  return res.render("postFeedback", { eventId });
}

async function handlePostFeedback(req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Access Denied");

  const verified = validateToken(token);
  const userId = verified.id; // Here is the user's ID

  try {
    const eventId = req.params.id;
    const { rating, comment } = req.body;

    // create feedback object
    let feedback = new Feedback({
      userId: userId,
      eventId: eventId,
      rating: rating,
      comment: comment,
    });

    // save feedback object
    await feedback.save();

    res
      .status(200)
      .json({ message: "Feedback added successfully", feedback: feedback });
  } catch (error) {
    res.status(400).json({
      message: "Unable to save feedback to database",
      error: err.message,
    });
  }
}

async function handleGetFeedbacksOfEvent(req, res) {
  // find feedback by event id
  const feedbacks = await Feedback.find(
    { eventId: req.params.id },
    { rating: 1, comment: 1 }
  );

  return res.json(feedbacks);
}

module.exports = {
  handleGetFeedbackUI,
  handlePostFeedback,
  handleGetFeedbacksOfEvent,
};
