import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true, trim: true, maxLength: 32 },
    ar: { type: String },
    fr: { type: String },
    de: { type: String },
    zh: { type: String },
    es: { type: String },
    ru: { type: String },
    ja: { type: String },
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Category", categorySchema);
