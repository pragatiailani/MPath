const mongoose  = require("mongoose");
const Organisation = require("../models/organisation");

function handleOrganisationSignInRender(req, res) {
  return res.render("organisationSignin", {
    message: req.flash("success"),
  });
}

async function handleOrganisationSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const token = await Organisation.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("organisationSignin", { error: "Incorrect credentials" });
  }
}

function handleOrganisationSignUpRender(req, res) {
  return res.render("organisationSignup");
}

async function handleOrganisationSignUp(req, res) {
  try {
    const organisation = new Organisation(req.body);

    await organisation.save();
    req.flash("success", "Organisation created successfully"); // Save the success message in flash
    return res.redirect("/organisation/signin");
  } catch (error) {
    res.render("signup");
  }
}

async function handleGetOrganisationById(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const organisation = await Organisation.findById(id, { password: 0, salt: 0 });
    if (!organisation) return res.status(404).json({ error: "organisation not found" });
    return res.json(organisation);
  } catch (error) {
    res.send(error);
  }
}

async function handleDeleteOrganisation(req, res) {
  try {
    const organisationId = req.organisation.id; // Here is the company ID
    await Organisation.findByIdAndDelete(organisationId);
    return res.json({ status: "organisation removed" });
  } catch (err) {
    return res.status(400).send("Error deleting organisation");
  }
}

// use data from req.organisation to prefill the form or use the token
async function handleUpdateOrganisationRender(req, res) {
  const id = req.params.id;
  const organisation = await Organisation.findById(id, { password: 0, salt: 0 });
  return res.render("updateOrganisationDetails", { organisation });
}

async function handleUpdateOrganisation(req, res) {
  const organisationId = req.organisation.id; // Here is the company ID

  try {
    await Organisation.findByIdAndUpdate(organisationId, req.body);
    return res.json({ status: "organisation updated" });
  } catch (err) {
    return res.status(400).send("Error updating organisation");
  }
}

module.exports = {
  handleOrganisationSignInRender,
  handleOrganisationSignIn,
  handleOrganisationSignUpRender,
  handleOrganisationSignUp,
  handleGetOrganisationById,
  handleDeleteOrganisation,
  handleUpdateOrganisationRender,
  handleUpdateOrganisation,
};
