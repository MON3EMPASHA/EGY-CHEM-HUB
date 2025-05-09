import asyncHandler from "../middlewares/asyncHandler.js";
import Slider from "../models/sliderModel.js";
import { translateText } from "../utils/translate.js";

export const createSlider = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body;
  if (!content || !title || !image) {
    res.status(400);
    throw new Error(
      "Please provide all required fields: title, content, image"
    );
  }
  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];
  const translatedContent = { en: content };
  const translatedTitle = { en: title };

  for (const lang of languages) {
    translatedContent[lang] = await translateText(content, lang);
    translatedTitle[lang] = await translateText(title, lang);
  }
  const slider = await Slider.create({
    title: translatedTitle,
    content: translatedContent,
    image,
  });
  res.status(201).json({ message: "Slider Added Successfully", slider });
});

export const getSliders = asyncHandler(async (req, res) => {
  const slider = await Slider.findOne().sort({ createdAt: -1 });
  if (!slider) {
    res.status(404);
    throw new Error("Slider request not found");
  }
  res.status(200).json(slider);
});

export const updateSlider = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body;
  const slider = await Slider.findOne();
  if (!slider) {
    res.status(404);
    throw new Error("Slider not found");
  }
  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];

  if (title?.en || typeof title === "string") {
    const titleEn = title.en || title;
    slider.title.en = titleEn;
    for (const lang of languages) {
      slider.title[lang] = await translateText(titleEn, lang);
    }
  } else if (title) {
    Object.keys(title).forEach((lang) => {
      slider.title[lang] = title[lang];
    });
  }

  if (content?.en || typeof content === "string") {
    const contentEn = content.en || content;
    slider.content.en = contentEn;
    for (const lang of languages) {
      slider.content[lang] = await translateText(contentEn, lang);
    }
  } else if (content) {
    Object.keys(content).forEach((lang) => {
      slider.content[lang] = content[lang];
    });
  }

  if (image) {
    slider.image = image;
  }

  await Slider.save();
  res.status(200).json(slider);
});

export const deleteSlider = asyncHandler(async (req, res) => {
  const slider = await Slider.findById(req.params.id);
  if (!slider) {
    res.status(404);
    throw new Error("Slider request not found");
  }
  await Slider.deleteOne();
  res.status(200).json({ message: "Slider request deleted" });
});
