import express from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary"; // Cloudinary storage engine
import multer from "multer"; // For handling file uploads
import asyncHandler from "../middlewares/asyncHandler.js";
import { getCloudinary } from "../utils/cloudinary.js"; // Cloudinary connection

// Create a router for our upload endpoints
const router = express.Router();

// 1. SET UP CLOUDINARY CONNECTION
const cloudinary = getCloudinary(); // Gets our configured Cloudinary instance

// 2. CONFIGURE HOW FILES WILL BE STORED
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Connect to our Cloudinary account
  params: {
    folder: "EGY-CHEM-HUB", // Save files in this folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "gif", "pdf"], // Only these file types
  },
});

// 3. CREATE UPLOAD MIDDLEWARE
const upload = multer({ storage }); // Uses our Cloudinary storage config

// 4. CREATE THE UPLOAD ENDPOINT
router.post(
  "/upload", // Listen for POST requests to /upload
  upload.single("myFile"), // Process single file from "myFile" form field

  // Handle the upload result
  asyncHandler(async (req, res) => {
    // Check if file was received
    if (!req.file) {
      throw new Error("No file was uploaded");
    }

    // If successful, send back:
    res.status(201).json({
      success: true,
      url: req.file.path, // Public URL of the uploaded file
      publicId: req.file.filename, // Cloudinary's unique ID for the file
    });
  })
);

// Make this router available to other files
export default router;
