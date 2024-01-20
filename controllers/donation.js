const mongoose = require("mongoose");
const Donation = require("../models/donation");

async function handleGetAllDonationEvents(req, res) {
  try {
    const donationEvents = await Donation.find();
    return res.render("donationEvents", { donationEvents });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

function handleNewDonationEventPageRender(req, res) {
  return res.render("newDonationEvent");
}

async function handleDonationEventCreate(req, res) {
  title, description, date, target, totalDonors, totalAmount;
  const { title, description, target } = req.body;
  try {
    const donation = new Donation({
      title,
      description,
      target,
      totalDonors: 0,
      totalAmount: 0,
    });

    await donation.save();
    req.flash("success", "Donation event created successfully"); // Save the success message in flash
    return res.send(donation);
  } catch (error) {
    res.json({ Error: error });
  }
}

async function handleGetDonationEventById(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const donation = await Donation.findById(id);
    if (!donation) return res.status(404).json({ error: "donation event not found" });
    return res.json(donation);
  } catch (error) {
    res.send(error);
  }
}

async function handleDeleteDonationEvent(req, res) {
  try {
    const id = req.params.id;
    await Donation.findByIdAndDelete(id);
    return res.json({ status: "donation event removed" });
  } catch (err) {
    return res.status(400).send("Error deleting event");
  }
}

// async function handleUpdateUserRender(req, res) {
//   const id = req.params.id;
//   const user = await User.findById(id, { password: 0, salt: 0 });
//   return res.render("updateUserDetails", { user });
// }

// async function handleUpdateUserById(req, res) {
//   const body = req.body;
//   const userId = req.user.id; // Here is the user's ID

//   const updatedUser = {
//     fullName: body.full_name,
//     email: body.email,
//     // profileImageURL: body.profile_image_url,
//     skills: body.skills.split(",").map((skill) => skill.trim()),
//     interests: body.interests.split(",").map((interest) => interest.trim()),
//     location: body.location,
//   };

//   try {
//     await User.findByIdAndUpdate(userId, updatedUser);
//     return res.json({ status: "user updated" });
//   } catch (err) {
//     return res.status(400).send("Error updating user");
//   }
// }

function handleDonatePageRender(req, res) {
  res.render("donateToEvent"); 
}


module.exports = {
  handleGetAllDonationEvents,
  handleGetDonationEventById,
  handleNewDonationEventPageRender,
  handleDonationEventCreate,
  handleDeleteDonationEvent,
  handleDonatePageRender
};
