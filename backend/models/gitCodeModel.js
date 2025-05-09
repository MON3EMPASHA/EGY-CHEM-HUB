import mongoose from "mongoose";

const gitCodeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("GitCode", gitCodeSchema);
