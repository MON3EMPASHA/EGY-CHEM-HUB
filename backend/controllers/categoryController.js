import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import translateText from "../utils/translate.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  const existingCategory = await Category.findOne({ "name.en": name });
  if (existingCategory) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];
  const translatedName = { en: name };

  // Translate to other languages
  for (const lang of languages) {
    translatedName[lang] = await translateText(name, lang);
  }

  const category = await Category.create({ name: translatedName });
  res.status(201).json({ message: "Category added successfully", category });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];

  // Update English name and translate if necessary
  if (name?.en || typeof name === "string") {
    const nameEn = name.en || name; // Handle both object and string input
    category.name.en = nameEn;
    for (const lang of languages) {
      category.name[lang] = await translateText(nameEn, lang);
    }
  } else if (name) {
    // Update other language-specific names
    Object.keys(name).forEach((lang) => {
      category.name[lang] = name[lang];
    });
  }

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
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.json(category);
});

export {
  createCategory,
  updateCategory,
  removeCategorybyId,
  getAllCategories,
  readCategorybyId,
};
