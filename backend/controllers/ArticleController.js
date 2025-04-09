import asyncHandler from "../middlewares/asyncHandler.js";
import Article from "../models/ArticleModel.js";
import { translateText, cachedTranslate } from "../utils/translate.js";
import redis from "redis";
const client = redis.createClient();

const createArticle = asyncHandler(async (req, res) => {
  const { title, content } = req.body; // Provided in English only

  switch (true) {
    case !title:
      throw new Error("Title is required");
    case !content:
      throw new Error("Content is required");
  }

  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];
  const translatedTitle = { en: title };
  const translatedContent = { en: content };

  for (const lang of languages) {
    translatedTitle[lang] = await cachedTranslate(title, lang);
    translatedContent[lang] = await cachedTranslate(content, lang);
  }

  const article = await Article.create({
    title: translatedTitle,
    content: translatedContent,
  });

  res.status(201).json(article);
});

const getAllArticles = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const articles = await Article.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Article.countDocuments();

  res.json({
    articles,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
});

const getArticlesByLang = asyncHandler(async (req, res) => {
  const lang = req.query.lang || "en";
  const articles = await Article.find().sort({ createdAt: -1 });

  const result = articles.map((a) => ({
    _id: a._id,
    title: a.title[lang] || a.title["en"],
    content: a.content[lang] || a.content["en"],
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
  }));

  res.json(result);
});

const getArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check cache first
  const cachedArticle = await client.get(`article:${id}`);
  if (cachedArticle) return res.json(JSON.parse(cachedArticle));

  // If not in cache, fetch from DB
  const article = await Article.findById(id);
  if (!article) throw new Error("Article not found");

  // Cache for 1 hour
  await client.setEx(`article:${id}`, 3600, JSON.stringify(article));

  res.json(article);
});

const updateArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];

  // Get the current article first
  const currentArticle = await Article.findById(id);
  if (!currentArticle) {
    res.status(404);
    throw new Error("Article not found");
  }

  const updateObject = {};
  let needsRetranslation = false;

  // Check if English title or content is being updated
  if (updates.title?.en || updates.content?.en) {
    needsRetranslation = true;
  }

  // Handle title updates
  if (updates.title) {
    for (const [lang, text] of Object.entries(updates.title)) {
      updateObject[`title.${lang}`] = text;
    }
  }

  // Handle content updates
  if (updates.content) {
    for (const [lang, text] of Object.entries(updates.content)) {
      updateObject[`content.${lang}`] = text;
    }
  }

  // Handle categories update
  if (updates.categories) {
    updateObject.categories = updates.categories;
  }

  // If English was updated, retranslate to all languages
  if (needsRetranslation) {
    const englishTitle = updates.title?.en || currentArticle.title.en;
    const englishContent = updates.content?.en || currentArticle.content.en;

    // Retranslate title
    for (const lang of languages) {
      updateObject[`title.${lang}`] = await cachedTranslate(englishTitle, lang);
    }

    // Retranslate content
    for (const lang of languages) {
      updateObject[`content.${lang}`] = await cachedTranslate(
        englishContent,
        lang
      );
    }
  }

  const article = await Article.findByIdAndUpdate(
    id,
    { $set: updateObject },
    { new: true, runValidators: true }
  );

  res.json(article);
});

const deleteArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await Article.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  res.json({ message: "Article marked as deleted" });
});

const searchArticles = asyncHandler(async (req, res) => {
  const { keyword, lang = "en" } = req.query;

  if (!keyword) throw new Error("Search query 'keyword' is required");

  const articles = await Article.find({
    [`title.${lang}`]: { $regex: keyword, $options: "i" },
  });

  res.json(articles);
});

const getArticlesByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const articles = await Article.find({ categories: category });
  res.json(articles);
});
export {
  createArticle,
  getAllArticles,
  getArticlesByLang,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  searchArticles,
  getArticlesByCategory,
};
