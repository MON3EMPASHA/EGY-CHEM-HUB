import asyncHandler from "../middlewares/asyncHandler.js";
import Vision from "../models/visionModel.js";
import { translateText } from "../utils/translate.js";

export const createVision = asyncHandler(async (req, res) => {
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
  const vision = await Vision.create({
    title: translatedTitle,
    content: translatedContent,
    image,
  });
  res.status(201).json({ message: "Vision Added Successfully", vision });
});

export const getVisions = asyncHandler(async (req, res) => {
  const vision = await Vision.findOne().sort({ createdAt: -1 });
  if (!vision) {
    res.status(404);
    throw new Error("Vision request not found");
  }
  res.status(200).json(vision);
});

export const updateVision = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body;
  const vision = await Vision.findOne();
  if (!vision) {
    res.status(404);
    throw new Error("Vision not found");
  }
  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];

  if (title?.en || typeof title === "string") {
    const titleEn = title.en || title;
    vision.title.en = titleEn;
    for (const lang of languages) {
      vision.title[lang] = await translateText(titleEn, lang);
    }
  } else if (title) {
    Object.keys(title).forEach((lang) => {
      vision.title[lang] = title[lang];
    });
  }

  if (content?.en || typeof content === "string") {
    const contentEn = content.en || content;
    vision.content.en = contentEn;
    for (const lang of languages) {
      vision.content[lang] = await translateText(contentEn, lang);
    }
  } else if (content) {
    Object.keys(content).forEach((lang) => {
      vision.content[lang] = content[lang];
    });
  }

  if (image) {
    vision.image = image;
  }

  await vision.save();
  res.status(200).json(vision);
});

export const deleteVision = asyncHandler(async (req, res) => {
  const vision = await Vision.findById(req.params.id);
  if (!vision) {
    res.status(404);
    throw new Error("Vision request not found");
  }
  await vision.deleteOne();
  res.status(200).json({ message: "Vision request deleted" });
});
