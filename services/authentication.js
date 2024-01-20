require("dotenv").config();

const JWT = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

function createTokenForUser(user) {
  const payload = {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    skills: user.skills,
    interests: user.interests,
    location: user.location,
    role: "user",
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function createTokenForOrganisation(org) {
  const payload = {
    id: org._id,
    name: org.name,
    description: org.description,
    phoneNo: org.phoneNo,
    profileImageURL: org.profileImageURL,
    location: org.location,
    role: "organisation",
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function createTokenForCompany(company) {
  const payload = {
    id: company._id,
    name: company.name,
    email: company.email,
    phoneNo: company.phoneNo,
    profileImageURL: company.profileImageURL,
    address: company.address,
    industry: company.industry,
    employees: company.employees,
    foundedYear: company.foundedYear,
    website: company.website,
    role: "company",
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  createTokenForOrganisation,
  createTokenForCompany,
  validateToken,
};
