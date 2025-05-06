import multer from "multer"; // Handles file uploads
import path from "path"; // Helps with file/folder paths
import { fileURLToPath } from "url"; // Needed for ES modules
import { dirname } from "path"; // Gets directory names

// 1. Get the full URL path of this file
const __filename = fileURLToPath(import.meta.url);
// Converts: "file:///C:/project/file.js" → "C:\project\file.js"

// 2. Get just the directory path
const __dirname = dirname(__filename);
// Takes "C:\project\file.js" → returns "C:\  "

// Configure WHERE and HOW to store files
const storage = multer.diskStorage({
  // WHERE to save files
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); // Save to "backend/uploads" folder
  },
  // WHAT to name files
  filename: (req, file, cb) => {
    cb(
      null,
      // Creates unique filename like: "myFile-123456789.jpg"
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Function to CHECK file types
const checkFileType = (file, cb) => {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;

  // Check file extension (like .jpg)
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check file type (like image/jpeg)
  const mimetype = filetypes.test(file.mimetype);

  // If both checks pass
  if (mimetype && extname) {
    return cb(null, true); // Accept file
  } else {
    cb(new Error("Error: Images, PDFs, and Docs only!"), false); // Reject file
  }
};

// Create the final upload middleware
const upload = multer({
  storage: storage, // Use our storage config
  limits: { fileSize: 1000000 }, // Limit to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb); // Use our file checker
  },
}).single("myFile"); // Accept SINGLE file with field name "myFile"

// Make this available to other files
export default upload;
