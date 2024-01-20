const { Router } = require("express");
const {
  handleUserSignIn,
  handleUserSignUp,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
  handleUserLogout,
  handleUserSignInRender,
  handleUserSignUpRender,
  handleUpdateUserRender,
} = require("../controllers/user");

const { authorize } = require("../middlewares/authorization");

const router = Router();

router.route("/signin").get(handleUserSignInRender).post(handleUserSignIn);

router.route("/signup").get(handleUserSignUpRender).post(handleUserSignUp);

router.route("/update").get(authorize(), handleUpdateUserRender).post(authorize(), handleUpdateUserById);

router.get("/logout", authorize(), handleUserLogout);

router.get("/:id", authorize(), handleGetUserById);

router.post("/delete", authorize(), handleDeleteUserById);

module.exports = router;
