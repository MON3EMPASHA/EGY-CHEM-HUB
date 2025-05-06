import express from "express";
const router = express.Router();
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController.js";

// Public: User submits a request
router.post("/", createSupplier);

// Admin / Supplier interaction routes
router.get("/", getAllSuppliers);
router.get("/:id", getSupplierById);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;
