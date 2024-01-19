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
  res.send("Hello! Welcome to Mpath");
});

app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/feedback", feedbackRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`running on ${PORT}`));
