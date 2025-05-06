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
    name: {
      en: { type: String, required: true },
      ar: { type: String },
      fr: { type: String },
      de: { type: String },
      zh: { type: String },
      es: { type: String },
      ru: { type: String },
      ja: { type: String },
    },
    image: { type: String, required: false },
    brand: { type: ObjectId, ref: "Brand", required: true },
    category: { type: ObjectId, ref: "Category", required: true },

    description: {
      en: { type: String, required: true },
      ar: { type: String },
      fr: { type: String },
      de: { type: String },
      zh: { type: String },
      es: { type: String },
      ru: { type: String },
      ja: { type: String },
    },

    reviews: [
      {
        type: reviewSchema,
      },
    ],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },

    isOnSale: { type: Boolean, default: false },
    saleStartDate: { type: Date, default: null },
    saleEndDate: { type: Date, default: null },

    tds: { type: String, default: null },
    msds: { type: String, default: null },
    coa: { type: String, default: null },
    //  specializedCertificate: { type: String, default: null },
    certifications: {
      en: { type: String, default: null },
      ar: { type: String },
      fr: { type: String },
      de: { type: String },
      zh: { type: String },
      es: { type: String },
      ru: { type: String },
      ja: { type: String },
    },
    chemicalName: {
      en: { type: String, default: null },
      ar: { type: String },
      fr: { type: String },
      de: { type: String },
      zh: { type: String },
      es: { type: String },
      ru: { type: String },
      ja: { type: String },
    },

    grade: {
      en: { type: String, default: null },
      ar: { type: String },
      fr: { type: String },
      de: { type: String },
      zh: { type: String },
      es: { type: String },
      ru: { type: String },
      ja: { type: String },
    },

    commercialName: {
      en: { type: String, default: null },
      ar: { type: String },
      fr: { type: String },
      de: { type: String },
      zh: { type: String },
      es: { type: String },
      ru: { type: String },
      ja: { type: String },
    },

    hsCode: { type: String, default: null },
    casNo: { type: String, default: null },

    usageApplications: {
      en: { type: String, default: null },
      ar: { type: String },
      fr: { type: String },
      de: { type: String },
      zh: { type: String },
      es: { type: String },
      ru: { type: String },
      ja: { type: String },
    },

    packingType: { type: String, default: null },
    packagingType: { type: String, default: null },
    hdPhotos: [{ type: String, default: [] }],

    storage: {
      en: { type: String, default: null },
      ar: { type: String },
      fr: { type: String },
      de: { type: String },
      zh: { type: String },
      es: { type: String },
      ru: { type: String },
      ja: { type: String },
    },

    safetyStandard: {
      en: { type: String, default: null },
      ar: { type: String },
      fr: { type: String },
      de: { type: String },
      zh: { type: String },
      es: { type: String },
      ru: { type: String },
      ja: { type: String },
    },

    minimumQuantities: { type: Number, default: null },
    hazard: { type: String, default: null },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
