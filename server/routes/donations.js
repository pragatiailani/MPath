const { Router } = require("express");
const {
  handleGetAllDonationEvents,
  handleGetDonationEventById,
  handleNewDonationEventPageRender,
  handleDonationEventCreate,
  handleDeleteDonationEvent,
} = require("../controllers/donation");

// by donation, we mean donation event here...

const { authorize } = require("../middlewares/authorization");

const router = Router();

router.get("/", handleGetAllDonationEvents);

router.route("/new").get(handleNewDonationEventPageRender).post(handleDonationEventCreate);

router.get("/:id", authorize(), handleGetDonationEventById);

router.post("/delete", authorize(), handleDeleteDonationEvent);

module.exports = router;
