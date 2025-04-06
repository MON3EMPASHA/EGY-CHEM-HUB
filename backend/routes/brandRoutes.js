import express from "express";
const router = express.Router();
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.post("/", authenticate, authorizeAdmin, createBrand);

router.get("/", getAllBrands);

router.get("/:id", getBrandById);

router.put("/:id", authenticate, authorizeAdmin, updateBrand);

router.delete("/:id", authenticate, authorizeAdmin, deleteBrand);

export default router;
