import asyncHandler from "../middlewares/asyncHandler.js";
import Event from "../models/EventModel.js";
import { translateText, cachedTranslate } from "../utils/translate.js";

const createEvent = asyncHandler(async (req, res) => {
  const { title, description, shortDescription, date, location, image } =
    req.body;

  if (
    !title ||
    !description ||
    !shortDescription ||
    !image ||
    !date ||
    !location
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (!req.user || !req.user._id) {
    res.status(401);
    throw new Error("Not authorized to create an event");
  }

  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];
  const translatedTitle = { en: title };
  const translatedDescription = { en: description };
  const translatedShortDescription = { en: shortDescription };
  const translatedLocation = { en: location };

  // Translate to other languages
  for (const lang of languages) {
    translatedTitle[lang] = await cachedTranslate(title, lang);
    translatedDescription[lang] = await cachedTranslate(description, lang);
    translatedLocation[lang] = await cachedTranslate(location, lang);
    translatedShortDescription[lang] = await cachedTranslate(
      shortDescription,
      lang
    );
  }

  const event = await Event.create({
    title: translatedTitle,
    description: translatedDescription,
    shortDescription: translatedShortDescription,
    date,
    location: translatedLocation,
    image,
    createdBy: req.user._id,
  });

  res.status(201).json(event);
});
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ date: 1 });

  const result = events.map((event) => ({
    _id: event._id,
    title: event.title,
    description: event.description,
    shortDescription: event.shortDescription,
    image: event.image,
    location: event.location,
    date: event.date,
    createdBy: event.createdBy,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  }));

  res.status(200).json(result);
});

const getEventById = asyncHandler(async (req, res) => {
  // Fetch the event by ID
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  0;
  const result = {
    _id: event._id,
    title: event.title,
    description: event.description,
    shortDescription: event.shortDescription,
    image: event.image,
    location: event.location,
    date: event.date,
    createdBy: event.createdBy,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  };

  res.status(200).json(result);
});

const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, shortDescription, image, date, location } =
    req.body;

  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const languages = ["ar", "fr", "de", "zh", "es", "ru", "ja"];

  if (title?.en) {
    event.title.en = title.en;
    for (const lang of languages) {
      event.title[lang] = await cachedTranslate(title.en, lang);
    }
  } else if (title) {
    Object.keys(title).forEach((lang) => {
      event.title[lang] = title[lang];
    });
  }

  if (description?.en) {
    event.description.en = description.en;
    for (const lang of languages) {
      event.description[lang] = await cachedTranslate(description.en, lang);
    }
  } else if (description) {
    Object.keys(description).forEach((lang) => {
      event.description[lang] = description[lang];
    });
  }

  if (shortDescription?.en) {
    event.shortDescription.en = shortDescription.en;
    for (const lang of languages) {
      event.shortDescription[lang] = await cachedTranslate(
        description.en,
        lang
      );
    }
  } else if (shortDescription) {
    Object.keys(shortDescription).forEach((lang) => {
      event.shortDescription[lang] = shortDescription[lang];
    });
  }

  if (location?.en) {
    event.location.en = location.en;
    for (const lang of languages) {
      event.location[lang] = await cachedTranslate(location.en, lang);
    }
  } else if (location) {
    Object.keys(location).forEach((lang) => {
      event.location[lang] = location[lang];
    });
  }

  if (date) {
    event.date = date;
  }

  if (image) {
    event.image = image;
  }

  const updatedEvent = await event.save();
  res.status(200).json(updatedEvent);
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await event.deleteOne();
  res.status(200).json({ message: "Event removed" });
});

export { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
