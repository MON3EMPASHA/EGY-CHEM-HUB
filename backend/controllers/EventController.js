import asyncHandler from "../middlewares/asyncHandler.js";
import Event from "../models/EventModel.js";

const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location } = req.body;

  if (!title || !description || !date || !location) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (!req.user || !req.user._id) {
    res.status(401);
    throw new Error("Not authorized to create an event");
  }

  const event = await Event.create({
    title,
    description,
    date,
    location,
    createdBy: req.user._id, // Automatically set to the logged-in admin's ID
  });

  res.status(201).json(event);
});
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.status(200).json(events);
});

const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.status(200).json(event);
});

const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location } = req.body;

  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  event.title = title || event.title;
  event.description = description || event.description;
  event.date = date || event.date;
  event.location = location || event.location;

  const updatedEvent = await event.save();
  res.status(200).json(updatedEvent);
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await event.deleteOne();
  res.status(200).json({ message: "Event removed" });
});

export { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
