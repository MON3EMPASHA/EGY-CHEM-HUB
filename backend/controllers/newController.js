import asyncHandler from "../middlewares/asyncHandler.js";
import News from "../models/newModel.js";
import { translateText } from "../utils/translate.js";

const createNews = asyncHandler(async (req, res) => {
  const { title, content, date } = req.body;

  if (!title || !content || !date) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (!req.user || !req.user._id) {
    res.status(401);
    throw new Error("Not authorized to create news");
  }

  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];
  const translatedTitle = { en: title };
  const translatedContent = { en: content };

  for (const lang of languages) {
    translatedTitle[lang] = await translateText(title, lang);
    translatedContent[lang] = await translateText(content, lang);
  }

  const news = await News.create({
    title: translatedTitle,
    content: translatedContent,
    date,
    createdBy: req.user._id,
  });

  res.status(201).json(news);
});

const getAllNews = asyncHandler(async (req, res) => {
  const newsList = await News.find().sort({ date: -1 }); // sorted descendingly by date
  res.status(200).json(newsList);
});

const getNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    res.status(404);
    throw new Error("News not found");
  }

  res.status(200).json(news);
});

const updateNews = asyncHandler(async (req, res) => {
  const { title, content, date } = req.body;

  const news = await News.findById(req.params.id);

  if (!news) {
    res.status(404);
    throw new Error("News not found");
  }

  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];

  // update english fields and translate to other languages, modifications in other languages dont recall api
  if (title?.en || typeof title === "string") {
    const titleEn = title.en || title;
    news.title.en = titleEn;
    for (const lang of languages) {
      news.title[lang] = await translateText(titleEn, lang);
    }
  } else if (title) {
    Object.keys(title).forEach((lang) => {
      news.title[lang] = title[lang];
    });
  }

  if (content?.en || typeof content === "string") {
    const contentEn = content.en || content;
    news.content.en = contentEn;
    for (const lang of languages) {
      news.content[lang] = await translateText(contentEn, lang);
    }
  } else if (content) {
    Object.keys(content).forEach((lang) => {
      news.content[lang] = content[lang];
    });
  }

  if (date) {
    news.date = date;
  }

  const updatedNews = await news.save();
  res.status(200).json(updatedNews);
});

const deleteNews = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    res.status(404);
    throw new Error("News not found");
  }

  await news.deleteOne();
  res.status(200).json({ message: "News removed" });
});

export { createNews, getAllNews, getNewsById, updateNews, deleteNews };
