const mongoose = require("mongoose");
const { createTokenForCompany } = require("../services/authentication");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  employees: {
    type: Number,
    required: true,
  },
  foundedYear: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Events",
    },
  ],
}, {timestamps: true});

companySchema.pre("save", function (next) {
  const company = this;

  if (!company.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

companySchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const company = await this.findOne({ email });

    if (!company) throw new Error("company not found");

    const salt = company.salt;
    const hashedPassword = company.password;

    const companyProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== companyProvidedHash)
      throw new Error("incorrect password");

    const token = createTokenForCompany(company);
    return token;
  }
);

const Company = mongoose.model("companies", companySchema);

module.exports = Company;
