const { Router } = require("express");
const {
  handleOrganisationSignIn,
  handleOrganisationSignUp,
  handleGetOrganisationById,
  handleDeleteOrganisation,
  handleUpdateOrganisation,
  handleOrganisationSignInRender,
  handleOrganisationSignUpRender,
  handleUpdateOrganisationRender,
} = require("../controllers/organisation");

const {
  handleUserLogout,
} = require("../controllers/user");

const { authorize } = require("../middlewares/authorization");

const router = Router();

router.route("/signin").get(handleOrganisationSignInRender).post(handleOrganisationSignIn);

router.route("/signup").get(handleOrganisationSignUpRender).post(handleOrganisationSignUp);

router.route("/update").get(authorize(), handleUpdateOrganisationRender).post(authorize(), handleUpdateOrganisation);

router.get("/logout", authorize(), handleUserLogout);

router.get("/:id", handleGetOrganisationById);

router.post("/delete", authorize(), handleDeleteOrganisation);

module.exports = router;
