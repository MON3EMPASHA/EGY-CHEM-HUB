import express from "express";
import {
  createSlider,
  getSliders,
  updateSlider,
  deleteSlider,
} from "../controllers/sliderController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createSlider);
router.get("/", getSliders);
router.put("/", authenticate, authorizeAdmin, updateSlider);
router.delete("/:id", authenticate, authorizeAdmin, deleteSlider);

export default router;
