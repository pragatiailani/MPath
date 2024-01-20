const { Router } = require("express");
const {
  handleCompanySignIn,
  handleCompanySignUp,
  handleGetCompanyById,
  handleDeleteCompany,
  handleUpdateCompany,
  handleCompanySignInRender,
  handleCompanySignUpRender,
  handleUpdateCompanyRender,
} = require("../controllers/company");

const {
  handleUserLogout,
} = require("../controllers/user");

const { authorize } = require("../middlewares/authorization");

const router = Router();

router.route("/signin").get(handleCompanySignInRender).post(handleCompanySignIn);

router.route("/signup").get(handleCompanySignUpRender).post(handleCompanySignUp);

router.route("/update").get(handleUpdateCompanyRender).post(handleUpdateCompany);

router.get("/logout", authorize(), handleUserLogout);

router.get("/:id", authorize(), handleGetCompanyById);

router.post("/delete", authorize(), handleDeleteCompany);

module.exports = router;
