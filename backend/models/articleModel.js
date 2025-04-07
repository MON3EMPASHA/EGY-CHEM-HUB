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
  },
  { timestamps: true }
);
const Article = mongoose.model("Article", ArticleSchema);
export default Article;
