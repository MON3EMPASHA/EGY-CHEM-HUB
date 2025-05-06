import mongoose from "mongoose";

const newSchema = new mongoose.Schema(
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
    date: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const New = mongoose.model("New", newSchema);
export default New;
