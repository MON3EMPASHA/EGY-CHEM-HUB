import mongoose from "mongoose";
"ar", "fr", "de", "zh", "es", "ru", "ja";
const ArticleSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      fr: String,
      ar: String,
      de: String,
      zh: String,
      es: String,
      ru: String,
      ja: String,
    },
    content: {
      en: { type: String, required: true },
      fr: String,
      ar: String,
      de: String,
      zh: String,
      es: String,
      ru: String,
      ja: String,
    },
    categories: [{ type: String }],
    tags: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
  },

  { timestamps: true }
);
const Article = mongoose.model("Article", ArticleSchema);
export default Article;
