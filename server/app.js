require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const feedbackRoutes = require("./routes/feedback");
const donationRoutes = require("./routes/donations");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MONGODB CONNECTED"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use(session({ secret: "your secret here", cookie: { maxAge: 60000 } }));
app.use(flash());

app.get("/", async (req, res) => {
  res.render("getAllEvents");
});

app.get("/community/forums", async (req, res) => {
  res.render("communityForums.ejs");
});

app.get("/donation-demo", async (req, res) => {
  res.render("donate");
});

app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/donation", donationRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`running on ${PORT}`));
