import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
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
    description: {
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
    location: {
      en: { type: String, required: true },
      ar: { type: String },
      fr: { type: String },
      de: { type: String },
      zh: { type: String },
      es: { type: String },
      ru: { type: String },
      ja: { type: String },
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

const Event = mongoose.model("Event", eventSchema);
export default Event;
