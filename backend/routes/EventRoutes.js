import express from "express";
const router = express.Router();
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/EventController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Public routes
router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin-only routes
router.post("/", authenticate, authorizeAdmin, createEvent);
router.put("/:id", authenticate, authorizeAdmin, updateEvent);
router.delete("/:id", authenticate, authorizeAdmin, deleteEvent);

export default router;
