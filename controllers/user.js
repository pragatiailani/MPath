const mongoose = require("mongoose");
const User = require("../models/user");
const Donor = require("../models/donor");

function handleUserSignInRender(req, res) {
  return res.render("signin", {
    message: req.flash("success"),
  });
}

async function handleUserSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("signin", { error: "Incorrect credentials" });
  }
}

function handleUserSignUpRender(req, res) {
  return res.render("signup");
}

async function handleUserSignUp(req, res) {
  const { fullName, email, phone, aadharno, education, job, password, languages, skills, interests, location } = req.body;
  try {
    const user = new User({
      fullName,
      email,
      phone,
      aadharno,
      education,
      job,
      password,
      languages: languages.split(",").map((language) => language.trim()), // assuming languages are comma-separated
      skills: skills.split(",").map((skill) => skill.trim()), // assuming skills are comma-separated
      interests: interests.split(",").map((interest) => interest.trim()), // assuming interests are comma-separated
      location,
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

async function handleUpdateUserRender(req, res) {
  const id = req.params.id;
  const user = await User.findById(id, { password: 0, salt: 0 });
  return res.render("updateUserDetails", { user });
}

async function handleUpdateUserById(req, res) {
  const body = req.body;
  const userId = req.user.id; // Here is the user's ID

  const updatedUser = {
    fullName: body.full_name,
    phone: body.phone,
    aadharno: body.aadharno,
    education: body.education,
    job: body.job,
    email: body.email,
    languages: languages.split(",").map((language) => language.trim()), // assuming languages are comma-separated\
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

async function handleAddUserDonation(req, res) {
  const { donationAmount } = req.body;
  try {
    const donor = new Donor({
      donorId: req.user.id,
      donationAmount,
      eventId: req.params.id,
    });

    await donor.save();
    return res.send("Donated Successfully");
  } catch (error) {
    res.send({ message: "error donating", error: error });
  }
}

module.exports = {
  handleUserSignInRender,
  handleUserSignIn,
  handleUserSignUpRender,
  handleUserSignUp,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserRender,
  handleUpdateUserById,
  handleUserLogout,
  handleAddUserDonation,
};
