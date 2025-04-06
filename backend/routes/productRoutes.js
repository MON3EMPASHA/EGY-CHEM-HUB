import express from "express";
const router = express.Router();

// controllers
import {
  createProduct,
  updateProduct,
  removeProduct,
  getProductById,
  getAllProducts,
  searchProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  getProductsByCategoryId,
  applySaleToProduct,
  getProductsOnSale,
  getProductsByBrandyId,
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Create a new product
router.route("/").post(authenticate, authorizeAdmin, createProduct);

// Get all products
router.route("/").get(getAllProducts);

// Update an existing product
router.route("/:id").put(authenticate, authorizeAdmin, updateProduct);

// Delete an existing product
router.route("/:id").delete(authenticate, authorizeAdmin, removeProduct);

// Search products by name
router.route("/search").get(searchProducts);

// Fetch top rated products
router.route("/top").get(fetchTopProducts);

// Fetch new products
router.route("/new").get(fetchNewProducts);

// Apply a sale to a product
router.route("/sale/:id").put(authenticate, authorizeAdmin, applySaleToProduct);

// Get products on sale
router.route("/sale").get(getProductsOnSale);

// Get a single product by ID
router.route("/:id").get(getProductById);

// Add a review to a product
router.route("/:id/review").post(authenticate, addProductReview);

// Filter products by category and price range
router.route("/filter").post(filterProducts);

// Get products by category ID
router.route("/category/:categoryId").get(getProductsByCategoryId);
router.route("/brand/:brandID").get(getProductsByBrandyId);

export default router;
