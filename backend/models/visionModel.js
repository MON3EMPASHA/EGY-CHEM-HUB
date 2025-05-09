import mongoose from "mongoose";

const visionSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      ar: { type: String },
      fr: { type: String },
      de: { type: String },
      zh: { type: String },
      es: { type: String },
      ru: { type: String },
      ja: { type: String },
    },
    content: {
      en: { type: String, required: true },
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
  },
  { timestamps: true }
);

const Vision = mongoose.model("Vision", visionSchema);
export default Vision;
