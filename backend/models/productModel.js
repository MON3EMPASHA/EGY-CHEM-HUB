import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: ObjectId, ref: "Brand", required: true },
    // quantity: { type: Number, required: true },
    category: { type: ObjectId, ref: "Category", required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    // countInStock: { type: Number, required: true, default: 0 },
    salePrice: { type: Number, default: null },
    isOnSale: { type: Boolean, default: false },
    saleStartDate: { type: Date, default: null },
    saleEndDate: { type: Date, default: null },
    tds: { type: String, default: null }, // Technical Data Sheet
    msds: { type: String, default: null }, // Material Safety Data Sheet
    coa: { type: String, default: null }, // Certificate Of Analysis
    specializedCertificate: { type: String, default: null }, // Specialized Certificate
    chemicalName: { type: String, default: null }, // Chemical name
    grade: { type: String, default: null }, // Grade (industrial, food, pharmaceutical)
    commercialName: { type: String, default: null }, // Commercial name
    hsCode: { type: String, default: null }, // HS code
    casNo: { type: String, default: null }, // CAS No.
    usageApplications: { type: String, default: null }, // Usage and applications
    packingType: { type: String, default: null }, // Packing type
    packagingType: { type: String, default: null }, // Packaging type
    hdPhotos: [{ type: String, default: [] }], // HD photos (array of URLs)
    storage: { type: String, default: null }, // Storage
    safetyStandard: { type: String, default: null }, // Safety standard (EMO)
    minimumQuantities: { type: Number, default: null }, // Minimum quantities
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
