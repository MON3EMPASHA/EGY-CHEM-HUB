import mongoose from "mongoose";
const visitorSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
});

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
