import express from "express";
import {
  createVision,
  getVisions,
  updateVision,
  deleteVision,
} from "../controllers/visionController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createVision);
router.get("/", getVisions);
router.put("/", authenticate, authorizeAdmin, updateVision);
router.delete("/:id", authenticate, authorizeAdmin, deleteVision);

export default router;
