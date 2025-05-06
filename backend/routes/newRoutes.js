import express from "express";
const router = express.Router();
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/newController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Public routes for all users
router.get("/", getAllNews);
router.get("/:id", getNewsById);

// Admin-only routes
router.post("/", authenticate, authorizeAdmin, createNews);
router.put("/:id", authenticate, authorizeAdmin, updateNews);
router.delete("/:id", authenticate, authorizeAdmin, deleteNews);

export default router;
