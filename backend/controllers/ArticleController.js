import asyncHandler from "../middlewares/asyncHandler.js";
import Article from "../models/ArticleModel.js";
import translateText from "../utils/translate.js";

const createArticle = asyncHandler(async (req, res) => {
  const { title, content } = req.body; // Provided in English only

  switch (true) {
    case !title:
      throw new Error("Title is required");
    case !content:
      throw new Error("Content is required");
  }

  const languages = ["fr", "ar", "de"];
  const translatedTitle = { en: title };
  const translatedContent = { en: content };

  for (const lang of languages) {
    translatedTitle[lang] = await translateText(title, lang);
    translatedContent[lang] = await translateText(content, lang);
  }

  const article = await Article.create({
    title: translatedTitle,
    content: translatedContent,
  });

  res.status(201).json(article);
});

const getArticles = asyncHandler(async (req, res) => {
  const lang = req.query.lang || "en";
  const articles = await Article.find().sort({ createdAt: -1 });

  const result = articles.map((a) => ({
    title: a.title[lang] || a.title["en"],
    content: a.content[lang] || a.content["en"],
  }));

  res.json(result);
});

export { createArticle, getArticles };
