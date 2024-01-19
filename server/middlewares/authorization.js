const jwt = require("jsonwebtoken");
const Event = require("../models/event");

function authorize() {
  return function (req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Access Denied");

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
  };
}

async function isOrganizer(req, res, next) {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    const userId = req.user.id;
    if (event.organizerId.toString() !== userId) {
      return res.status(403).send("Forbidden");
    }
    next();
  } catch (err) {
    res.send("Error");
  }
}

module.exports = { authorize, isOrganizer };
