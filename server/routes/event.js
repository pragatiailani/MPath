const { Router } = require("express");
const {
  handleGetAllEvents,
  handleGetEventById,
  handleCreateEvent,
  handleUpdateEvent,
  handleDeleteEvent,
} = require("../controllers/event");

const Event = require("../models/event");
const { authorize, isOrganizer } = require("../middlewares/authorization");

const router = Router();

router.get("/", handleGetAllEvents);

router
  .route("/new")
  .get(authorize(), (req, res) => {
    res.render("createNewEvent");
  })
  .post(authorize(), handleCreateEvent);

router
  .route("/update/:id")
  .get(isOrganizer, async (req, res) => {
    const id = req.params.id;
    const event = await Event.findById(id, { password: 0, salt: 0 });
    return res.render("updateEventDetails", { event });
  })
  .post(isOrganizer, handleUpdateEvent);

router
  .route("/:id")
  .get(handleGetEventById)
  .delete(isOrganizer, handleDeleteEvent);

module.exports = router;
