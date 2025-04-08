import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      en: String,
      fr: String,
      ar: String,
      de: String,
    },
    content: {
      en: String,
      fr: String,
      ar: String,
      de: String,
    },
    categories: [{ type: String }],
    tags: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
  },

  { timestamps: true }
);
const Article = mongoose.model("Article", ArticleSchema);
export default Article;
