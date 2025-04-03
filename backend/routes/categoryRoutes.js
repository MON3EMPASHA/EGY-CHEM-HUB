import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategorybyId,
  getAllCategories,
  readCategorybyId,
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

//create a new category
router.route("/").post(authenticate, authorizeAdmin, createCategory);

//update an existing category
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);

//delete an existing category
router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategorybyId);

//get all categories
router.route("/").get(getAllCategories);

//get a single category by id
router.route("/:id").get(readCategorybyId);

export default router;
