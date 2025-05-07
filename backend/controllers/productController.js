import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import { cachedTranslate } from "../utils/translate.js";
import Category from "../models/categoryModel.js";
import Brand from "../models/brandModel.js";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const {
  Types: { ObjectId },
} = mongoose;
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    brand,
    // Translatable optional fields
    chemicalName,
    grade,
    commercialName,
    usageApplications,
    storage,
    safetyStandard,
    // Non-translatable optional fields
    hsCode,
    casNo,
    packingType,
    minimumQuantities,
    ...rest
  } = req.body;

  // === 1. Validate required fields ===
  if (!name?.en) throw new Error("English name is required");
  if (!description?.en) throw new Error("English description is required");
  if (!category) throw new Error("Category is required");
  if (!brand) throw new Error("Brand is required");

  // === 2. Validate ObjectId format ===
  if (!mongoose.Types.ObjectId.isValid(category))
    throw new Error("Invalid category ID");
  if (!mongoose.Types.ObjectId.isValid(brand))
    throw new Error("Invalid brand ID");

  // === 3. Check if category/brand exist in DB ===
  const [categoryExists, brandExists] = await Promise.all([
    Category.exists({ _id: category }),
    Brand.exists({ _id: brand }),
  ]);
  if (!categoryExists) throw new Error("Category not found");
  if (!brandExists) throw new Error("Brand not found");

  // === 4. Define languages to translate into ===
  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];

  // === 5. Initialize translated fields with English values ===
  const translatedFields = {
    name: { en: name.en },
    description: { en: description.en },
  };

  // === 6. Translate REQUIRED fields (name & description) ===
  for (const lang of languages) {
    try {
      translatedFields.name[lang] = await cachedTranslate(name.en, lang);
      translatedFields.description[lang] = await cachedTranslate(
        description.en,
        lang
      );
      await delay(500); // Rate limiting
    } catch (error) {
      console.error(`Failed to translate to ${lang}:`, error);
      // Fallback to English if translation fails
      translatedFields.name[lang] = name.en;
      translatedFields.description[lang] = description.en;
    }
  }

  // === 7. Translate OPTIONAL fields (if they exist) ===
  const optionalTranslatableFields = {
    chemicalName,
    grade,
    commercialName,
    usageApplications,
    storage,
    safetyStandard,
  };

  for (const [field, value] of Object.entries(optionalTranslatableFields)) {
    if (value?.en) {
      translatedFields[field] = { en: value.en }; // Initialize with English
      for (const lang of languages) {
        try {
          translatedFields[field][lang] = await cachedTranslate(value.en, lang);
          await delay(500);
        } catch (error) {
          console.error(`Failed to translate ${field} to ${lang}:`, error);
          translatedFields[field][lang] = value.en; // Fallback
        }
      }
    }
  }

  // === 8. Non-translatable fields (directly passed) ===
  const nonTranslatableFields = {
    hsCode,
    casNo,
    packingType,
    minimumQuantities,
  };

  // === 9. Create the product ===
  const product = await Product.create({
    name: translatedFields.name,
    description: translatedFields.description,
    // Spread translated optional fields (if they exist)
    ...(translatedFields.chemicalName && {
      chemicalName: translatedFields.chemicalName,
    }),
    ...(translatedFields.grade && { grade: translatedFields.grade }),
    ...(translatedFields.commercialName && {
      commercialName: translatedFields.commercialName,
    }),
    ...(translatedFields.usageApplications && {
      usageApplications: translatedFields.usageApplications,
    }),
    ...(translatedFields.storage && { storage: translatedFields.storage }),
    ...(translatedFields.safetyStandard && {
      safetyStandard: translatedFields.safetyStandard,
    }),
    // Spread non-translatable fields (if they exist)
    ...(nonTranslatableFields.hsCode && {
      hsCode: nonTranslatableFields.hsCode,
    }),
    ...(nonTranslatableFields.casNo && { casNo: nonTranslatableFields.casNo }),
    ...(nonTranslatableFields.packingType && {
      packingType: nonTranslatableFields.packingType,
    }),
    ...(nonTranslatableFields.minimumQuantities && {
      minimumQuantities: nonTranslatableFields.minimumQuantities,
    }),
    // Required fields
    category,
    brand,
    // Spread any other valid fields
    ...rest,
  });

  res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];

  // === 1. Validate category/brand IDs (if provided) ===
  if (updates.category && !mongoose.Types.ObjectId.isValid(updates.category)) {
    throw new Error("Invalid category ID");
  }
  if (updates.brand && !mongoose.Types.ObjectId.isValid(updates.brand)) {
    throw new Error("Invalid brand ID");
  }

  // === 2. Check if category/brand exist (if provided) ===
  if (updates.category) {
    const categoryExists = await Category.exists({ _id: updates.category });
    if (!categoryExists) throw new Error("Category not found");
  }
  if (updates.brand) {
    const brandExists = await Brand.exists({ _id: updates.brand });
    if (!brandExists) throw new Error("Brand not found");
  }

  // === 3. Fetch the existing product ===
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    throw new Error("Product not found");
  }

  // === 4. Initialize updates with existing values (to preserve required fields) ===
  const finalUpdates = { ...existingProduct.toObject(), ...updates };

  // === 5. Handle translatable fields ===
  const translatableFields = [
    "name",
    "description",
    "chemicalName",
    "grade",
    "commercialName",
    "usageApplications",
    "storage",
    "safetyStandard",
  ];

  for (const field of translatableFields) {
    if (updates[field]) {
      // Case 1: Only a specific language is updated (e.g., `name.ar`)
      if (typeof updates[field] === "string" || !updates[field].en) {
        // Merge the update without overwriting other languages
        finalUpdates[field] = {
          ...existingProduct[field],
          ...updates[field],
        };
      }
      // Case 2: English is updated → re-translate to all languages
      else if (updates[field].en) {
        finalUpdates[field] = { en: updates[field].en };
        for (const lang of languages) {
          try {
            finalUpdates[field][lang] = await cachedTranslate(
              updates[field].en,
              lang
            );
            await delay(500);
          } catch (error) {
            console.error(`Failed to translate ${field} to ${lang}:`, error);
            finalUpdates[field][lang] = updates[field].en; // Fallback
          }
        }
      }
    }
  }

  // === 6. Update the product ===
  const product = await Product.findByIdAndUpdate(id, finalUpdates, {
    new: true,
    runValidators: true,
  });

  res.json(product);
});

const removeProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new Error("Product not found");
  }

  res.json({ message: "Product deleted successfully" });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new Error("Product not found");
  }
  // Increment views
  product.views = (product.views || 0) + 1;
  await product.save();

  res.json(product);
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .populate("category")
    .populate("brand")
    .limit(12)
    .sort({ createdAt: -1 });

  res.json(products);
});

const getTopViewedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ views: -1 }).limit(10);
  res.json(products);
});
/////////////////////////////////////////////////////////////
const searchProducts = asyncHandler(async (req, res) => {
  const pageSize = 6; // Limits results to a fixed page size (6 products).
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { "name.en": { $regex: req.query.keyword, $options: "i" } },
          { "name.ar": { $regex: req.query.keyword, $options: "i" } },
          { "name.fr": { $regex: req.query.keyword, $options: "i" } },
          { "name.de": { $regex: req.query.keyword, $options: "i" } },
          { "name.zh": { $regex: req.query.keyword, $options: "i" } },
          { "name.es": { $regex: req.query.keyword, $options: "i" } },
          { "name.ru": { $regex: req.query.keyword, $options: "i" } },
          { "name.ja": { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    hasMore: count > pageSize * page,
  });
});
const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if user already reviewed the product
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
  }

  // Add new review
  const review = {
    name: req.user.username,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  // Update total reviews and average rating
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({ message: "Review added" });
});

// Fetch top-rated products (sorted by rating, limited to 4)
const fetchTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.json(products);
});

// Fetch newest products (sorted by latest ID, limited to 5)
const fetchNewProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ _id: -1 }).limit(5);
  res.json(products);
});

// Filter products by category and price range
const filterProducts = asyncHandler(async (req, res) => {
  const { checked, radio } = req.body;

  let args = {};
  if (checked.length > 0) args.category = checked;
  if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

  const products = await Product.find(args);
  res.json(products);
});

// Fetch products by category ID
const getProductsByCategoryId = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    res.status(400);
    throw new Error("Category ID is required");
  }
  const products = await Product.find({ category: categoryId });
  if (!products || products.length === 0) {
    res.status(404);
    throw new Error("No products found for this category");
  }
  res.json(products);
});

const getProductsByBrandyId = asyncHandler(async (req, res) => {
  const { brandID } = req.params;
  if (!brandID) {
    res.status(400);
    throw new Error("Brand ID is required");
  }
  const products = await Product.find({ brand: brandID });
  if (!products || products.length === 0) {
    res.status(404);
    throw new Error("No products found for this category");
  }
  res.json(products);
});

const applySaleToProduct = asyncHandler(async (req, res) => {
  const { productId, discountPercentage, saleStartDate, saleEndDate } =
    req.body;

  if (!productId || !discountPercentage) {
    res.status(400);
    throw new Error("Product ID and discount percentage are required");
  }

  if (discountPercentage <= 0 || discountPercentage > 100) {
    res.status(400);
    throw new Error("Discount percentage must be between 1 and 100");
  }

  if (
    saleStartDate &&
    saleEndDate &&
    new Date(saleStartDate) > new Date(saleEndDate)
  ) {
    res.status(400);
    throw new Error("Sale start date cannot be after the end date");
  }

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.salePrice =
    product.price - (product.price * discountPercentage) / 100;
  product.isOnSale = true;
  product.saleStartDate = saleStartDate || null;
  product.saleEndDate = saleEndDate || null;

  await product.save();

  res.json({ message: "Sale applied successfully", product });
});
const getProductsOnSale = asyncHandler(async (req, res) => {
  const currentDate = new Date();

  const products = await Product.find({
    isOnSale: true,
    saleStartDate: { $lte: currentDate },
    saleEndDate: { $gte: currentDate },
  });

  if (!products || products.length === 0) {
    res.status(404);
    throw new Error("No products on sale found");
  }

  res.json(products);
});
export {
  createProduct,
  updateProduct,
  removeProduct,
  getProductById,
  getAllProducts,
  searchProducts, //fetchproducts
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  getProductsByCategoryId,
  applySaleToProduct,
  getProductsOnSale,
  getProductsByBrandyId,
  getTopViewedProducts,
};
