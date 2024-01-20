const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
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
    phoneNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events",
      },
    ],
  },
  {
    timestamps: true,
  }
);

organisationSchema.pre("save", function (next) {
  const organisation = this;

  if (!organisation.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

organisationSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const organisation = await this.findOne({ email });

    if (!organisation) throw new Error("organisation not found");

    const salt = organisation.salt;
    const hashedPassword = organisation.password;

    const organisationProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== organisationProvidedHash)
      throw new Error("incorrect password");

    const token = createTokenForOrganisation(organisation);
    return token;
  }
);

const Organisation = mongoose.model("organisations", organisationSchema);

module.exports = Organisation;
