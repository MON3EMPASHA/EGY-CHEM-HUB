// MUST BE FIRST - Load environment variables
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(".env") });

// Then other imports
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Routes imports
import userRoutes from "./routes/userRoutes.js";
import categoriesRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import eventRoutes from "./routes/EventRoutes.js";
import uploadRoutes from "./routes/UploadRoutes.js";
import cloudinaryRoutes from "./routes/cloudinaryRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug: Verify Cloudinary env vars are loaded
console.log("Cloudinary Config Check:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "***" : "MISSING",
  api_key: process.env.CLOUDINARY_API_KEY ? "***" : "MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "***" : "MISSING",
});

const port = process.env.PORT || 5002;
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/events", eventRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
