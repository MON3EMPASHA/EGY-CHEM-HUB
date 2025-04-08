import express from "express";
const router = express.Router();
import {
  createArticle,
  getAllArticles,
  getArticlesByLang,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  searchArticles,
  getArticlesByCategory,
} from "../controllers/articleController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Create a new article
router.post("/", authenticate, authorizeAdmin, createArticle);

// Get all articles (all languages)
router.get("/all", getAllArticles);

// Get articles by language (default to English)
router.get("/", getArticlesByLang);

// Search
router.get("/search", searchArticles);

// getArticlesByCategory
router.get("/category/:category", getArticlesByCategory);

// Get a single article by ID (all languages)
router.get("/:id", getArticleById);

// Update an article by ID
router.put("/:id", authenticate, authorizeAdmin, updateArticleById);

// Delete an article by ID
router.delete("/:id", authenticate, authorizeAdmin, deleteArticleById);

export default router;
