import asyncHandler from "../middlewares/asyncHandler.js";
import Supplier from "../models/supplierModel.js";

export const createSupplier = asyncHandler(async (req, res) => {
  const { item, email, details, quantity, phone } = req.body;
  if (!item || !email || !quantity || !phone) {
    res.status(400);
    throw new Error("Item, email, quantity, and phone are required");
  }
  const supplier = await Supplier.create({
    item,
    email,
    details,
    quantity,
    phone,
  });
  res.status(201).json(supplier);
});

export const getAllSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Supplier.find().sort({ createdAt: -1 });
  res.json(suppliers);
});

export const getSupplierById = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) {
    res.status(404);
    throw new Error("Supplier request not found");
  }
  res.json(supplier);
});

export const updateSupplier = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) {
    res.status(404);
    throw new Error("Supplier request not found");
  }
  if (status) supplier.status = status;
  await supplier.save();
  res.json(supplier);
});

export const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) {
    res.status(404);
    throw new Error("Supplier request not found");
  }
  await supplier.deleteOne();
  res.json({ message: "Supplier request deleted" });
});
