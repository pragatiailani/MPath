const { mongoose } = require("mongoose");
const User = require("../models/user");

async function handleUserSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("signin", { error: "Incorrect credentials" });
  }
}

async function handleUserSignUp(req, res) {
  const { fullName, email, password, skills, interests, location } = req.body;
  try {
    const user = new User({
      fullName,
      email,
      password,
      skills: skills.split(",").map((skill) => skill.trim()), // assuming skills are comma-separated
      interests: interests.split(",").map((interest) => interest.trim()), // assuming interests are comma-separated
      location,
      // profileImageURL,
    });

    await user.save();
    req.flash("success", "User created successfully"); // Save the success message in flash
    return res.redirect("/user/signin");
  } catch (error) {
    res.render("signup");
  }
}

async function handleGetUserById(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const user = await User.findById(id, { password: 0, salt: 0 });
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  } catch (error) {
    res.send(error);
  }
}

async function handleDeleteUserById(req, res) {
  try {
    const userId = req.user.id; // Here is the user's ID
    await User.findByIdAndDelete(userId);
    return res.json({ status: "user removed" });
  } catch (err) {
    return res.status(400).send("Error deleting user");
  }
}

async function handleUpdateUserById(req, res) {
  const body = req.body;
  const userId = req.user.id; // Here is the user's ID

  const updatedUser = {
    fullName: body.full_name,
    email: body.email,
    // profileImageURL: body.profile_image_url,
    skills: body.skills.split(",").map((skill) => skill.trim()),
    interests: body.interests.split(",").map((interest) => interest.trim()),
    location: body.location,
  };

  try {
    await User.findByIdAndUpdate(userId, updatedUser);
    return res.json({ status: "user updated" });
  } catch (err) {
    return res.status(400).send("Error updating user");
  }
}

function handleUserLogout(req, res) {
  res.clearCookie("token");
  return res.redirect("/");
}

module.exports = {
  handleUserSignIn,
  handleUserSignUp,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
  handleUserLogout,
};
