import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, quantity, brand } = req.body;

  // Validation
  switch (true) {
    case !name:
      throw new Error("Name is required");
    case !brand:
      throw new Error("Brand is required");
    case !description:
      throw new Error("Description is required");
    case !price:
      throw new Error("Price is required");
    case !category:
      throw new Error("Category is required");
    case !quantity:
      throw new Error("Quantity is required");
  }

  const product = await Product.create({ ...req.body });

  res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, quantity, brand } = req.body;

  // Ensure at least one field is provided for update
  if (!name && !description && !price && !category && !quantity && !brand) {
    throw new Error("At least one field is required for update.");
  }

  // Validate category if provided
  if (category && !mongoose.Types.ObjectId.isValid(category)) {
    throw new Error("Invalid category ID.");
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true, runValidators: true }
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
};
