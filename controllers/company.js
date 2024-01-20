const mongoose  = require("mongoose");
const Company = require("../models/company");

function handleCompanySignInRender(req, res) {
  return res.render("signin", {
    message: req.flash("success"),
  });
}

async function handleCompanySignIn(req, res) {
  const { email, password } = req.body;
  try {
    const token = await Company.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("signin", { error: "Incorrect credentials" });
  }
}

function handleCompanySignUpRender(req, res) {
  return res.render("signup");
}

async function handleCompanySignUp(req, res) {
  try {
    const company = new Company(req.body);

    await company.save();
    req.flash("success", "Company created successfully"); // Save the success message in flash
    return res.redirect("/company/signin");
  } catch (error) {
    res.render("signup");
  }
}

async function handleGetCompanyById(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const company = await Company.findById(id, { password: 0, salt: 0 });
    if (!company) return res.status(404).json({ error: "company not found" });
    return res.json(company);
  } catch (error) {
    res.send(error);
  }
}

async function handleDeleteCompany(req, res) {
  try {
    const companyId = req.company.id; // Here is the company ID
    await Company.findByIdAndDelete(companyId);
    return res.json({ status: "company removed" });
  } catch (err) {
    return res.status(400).send("Error deleting company");
  }
}

async function handleUpdateCompanyRender(req, res) {
  const id = req.params.id;
  const company = await Company.findById(id, { password: 0, salt: 0 });
  return res.render("updateCompanyDetails", { company });
}

async function handleUpdateCompany(req, res) {
  const companyId = req.company.id; // Here is the company ID

  try {
    await Company.findByIdAndUpdate(companyId, req.body);
    return res.json({ status: "company updated" });
  } catch (err) {
    return res.status(400).send("Error updating company");
  }
}

module.exports = {
  handleCompanySignInRender,
  handleCompanySignIn,
  handleCompanySignUpRender,
  handleCompanySignUp,
  handleGetCompanyById,
  handleDeleteCompany,
  handleUpdateCompanyRender,
  handleUpdateCompany,
};
