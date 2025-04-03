import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    res.status(400);
    throw new Error("category already exists");
  }
  const category = await Category.create({ name });
  res.status(201).json({ message: "Category added successfully", name });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { categoryId } = req.params;

  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  category.name = name;
  const updatedCategory = await category.save();
  res.json(updatedCategory);
});

const removeCategorybyId = asyncHandler(async (req, res) => {
  const removed = await Category.findByIdAndDelete(req.params.categoryId);

  if (!removed) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.json({ message: "Category deleted successfully" });
});

const getAllCategories = asyncHandler(async (req, res) => {
  const all = await Category.find({});
  res.json(all);
});

const readCategorybyId = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });
  res.json(category);
});

export {
  createCategory,
  updateCategory,
  removeCategorybyId,
  getAllCategories,
  readCategorybyId,
};
