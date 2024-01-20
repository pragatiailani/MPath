const Event = require("../models/event");

// GET all events
async function handleGetAllEvents(req, res) {
  try {
    const events = await Event.find();
    // res.status(200).json(events);
    res.render("getAllEvents", { events });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET a single event by ID
async function handleGetEventById(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// POST a new event
async function handleCreateEvent(req, res) {
  const {
    eventName,
    description,
    eventType,
    date,
    time,
    location,
    maxVolunteers,
  } = req.body;

  const { id, type } = req.user; // replace this with your actual logic to get the user's ID and type

  try {
    const event = new Event({
      organizerId: id,
      organizerModel: type,
      eventName,
      description,
      eventType,
      date,
      time,
      location,
      maxVolunteers,
      currentVolunteers: [],
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// PUT update an existing event
async function handleUpdateEvent(req, res) {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// DELETE an event
async function handleDeleteEvent(req, res) {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleGetAllEvents,
  handleGetEventById,
  handleCreateEvent,
  handleUpdateEvent,
  handleDeleteEvent,
};
