import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/local",
  upload,
  asyncHandler(async (req, res) => {
    if (!req.file) throw new Error("No file uploaded");

    res.status(201).json({
      success: true,
      path: `/uploads/${req.file.filename}`,
    });
  })
);

export default router;
