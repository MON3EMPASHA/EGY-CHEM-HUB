import express from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import asyncHandler from "../middlewares/asyncHandler.js";
import { getCloudinary } from "../utils/cloudinary.js";

const router = express.Router();

// Initialize Cloudinary
const cloudinary = getCloudinary();

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "EGY-CHEM-HUB",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "pdf"],
    transformation: [{ width: 800, crop: "scale" }],
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("myFile"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new Error("No file was uploaded");
    }

    res.status(201).json({
      success: true,
      url: req.file.path,
      publicId: req.file.filename,
    });
  })
);

export default router;
