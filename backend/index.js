//Packges
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//Utiles
import connectDB from "./config/db.js";
//Routes
import userRoutes from "./routes/userRoutes.js";
import categoriesRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config({ path: path.resolve("backend", ".env") });
const port = process.env.PORT || 5002;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
