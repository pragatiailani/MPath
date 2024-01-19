const { Router } = require("express");
const {
  handleGetFeedbackUI,
  handlePostFeedback,
  handleGetFeedbacksOfEvent,
} = require("../controllers/feedback");
const { authorize, isOrganizer } = require("../middlewares/authorization");
const router = Router();

// create feedback route
router
  .route("/:id")
  .get(authorize(), handleGetFeedbackUI)
  .post(authorize(), handlePostFeedback);

// get feedbacks of an event
router.get("/:id/all", isOrganizer, handleGetFeedbacksOfEvent);

module.exports = router;
