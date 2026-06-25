import express from "express";
import eventController from "../controller/events.js";

const router = express.Router();

// Define the routes for events
router.post("/", eventController.getEvents);

router.post("/createEvent", eventController.createEvent);

router.route("/:id")
.put(eventController.updateEvent)
.delete(eventController.deleteEvent);

export default router;
