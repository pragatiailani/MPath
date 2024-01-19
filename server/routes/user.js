const { Router } = require("express");
const {
  handleUserSignIn,
  handleUserSignUp,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
  handleUserLogout,
} = require("../controllers/user");
const User = require("../models/user");
const { authorize } = require("../middlewares/authorization");

const router = Router();

router
  .route("/signin")
  .get((req, res) => {
    return res.render("signin", {
      message: req.flash("success"),
    });
  })
  .post(handleUserSignIn);

router
  .route("/signup")
  .get((req, res) => {
    return res.render("signup");
  })
  .post(handleUserSignUp);

router
  .route("/update")
  .get(authorize(), async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id, { password: 0, salt: 0 });
    return res.render("updateUserDetails", { user });
  })
  .post(handleUpdateUserById);

router.get("/logout", authorize(), handleUserLogout);

router.get("/:id", authorize(), handleGetUserById);

router.delete("/", authorize(), handleDeleteUserById);

module.exports = router;
