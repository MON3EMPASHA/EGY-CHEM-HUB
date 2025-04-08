import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import translateText from "../utils/translate.js";
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
    // Non-translatable optional fields (just examples, add others as needed)
    hsCode,
    casNo,
    packingType,
    minimumQuantities,
    // ... include other fields from your schema
    ...rest // Catch any other fields
  } = req.body;

  // Validation for required fields
  if (!name?.en) throw new Error("English name is required");
  if (!description?.en) throw new Error("English description is required");
  if (!category) throw new Error("Category is required");
  if (!brand) throw new Error("Brand is required");

  // check if category and brand are valid ObjectId
  if (!ObjectId.isValid(category)) throw new Error("Invalid category ID");
  if (!ObjectId.isValid(brand)) throw new Error("Invalid brand ID");
  const [categoryExists, brandExists] = await Promise.all([
    Category.exists({ _id: category }),
    Brand.exists({ _id: brand }),
  ]);

  if (!categoryExists) throw new Error("Category not found");
  if (!brandExists) throw new Error("Brand not found");

  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];

  // Initialize with English values for required fields
  const translatedFields = {
    name: { en: name.en },
    description: { en: description.en },
  };

  // List of fields that need translation (all nested { en: ... })
  const translatableFields = {
    chemicalName,
    grade,
    commercialName,
    usageApplications,
    storage,
    safetyStandard,
  };

  // Process translatable fields (if they exist)
  for (const [field, value] of Object.entries(translatableFields)) {
    if (value?.en) {
      translatedFields[field] = { en: value.en };
      for (const lang of languages) {
        try {
          translatedFields[field][lang] = await translateText(value.en, lang);
          await delay(500); // Rate limiting
        } catch (error) {
          console.error(`Failed to translate ${field} to ${lang}:`, error);
          translatedFields[field][lang] = value.en; // Fallback to English
        }
      }
    }
  }

  // Non-translatable fields (directly pass through)
  const nonTranslatableFields = {
    hsCode,
    casNo,
    packingType,
    minimumQuantities,
    // ... add other non-translatable fields here
  };

  // Create the product with ALL fields (translatable + non-translatable)
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
    // Spread any other valid fields (optional, if you want to allow extra fields)
    ...rest,
  });

  res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const updates = req.body; // Dynamically handle all fields from the request body

  // Validate category if provided
  if (updates.category && !mongoose.Types.ObjectId.isValid(updates.category)) {
    throw new Error("Invalid category ID.");
  }

  // Validate brand if provided
  if (updates.brand && !mongoose.Types.ObjectId.isValid(updates.brand)) {
    throw new Error("Invalid brand ID.");
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { ...updates }, // Spread all updates dynamically
    { new: true, runValidators: true } // Return the updated document and validate fields
  );

  if (!product) {
    throw new Error("Product not found.");
  }

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
/////////////////////////////////////////////////////////////
const searchProducts = asyncHandler(async (req, res) => {
  // This function is used to search for products based on a keyword (name)

  const pageSize = 6; //Limits results to a fixed page size (6 products).

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword }).limit(pageSize);

  res.json({
    products,
    page: 1,
    pages: Math.ceil(count / pageSize),
    hasMore: count > pageSize,
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
};
