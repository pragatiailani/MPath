const { Router } = require("express");
const { handleDonatePageRender } = require("../controllers/donation.js");
const { handleAddUserDonation } = require("../controllers/user");

const router = Router();

router
  .route("/:id")
  .get(authorize(), handleDonatePageRender)
  .post(authorize(), handleAddUserDonation);

module.exports = router;
