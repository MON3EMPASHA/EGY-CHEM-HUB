import Visitor from "../models/visitorModel.js";

export const trackVisitor = async (req, res, next) => {
  await Visitor.updateOne(
    { date: new Date().toISOString().slice(0, 10) },
    { $inc: { count: 1 } },
    { upsert: true }
  );
  next();
};
