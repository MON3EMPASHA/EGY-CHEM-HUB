import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    item: { type: String, required: true },
    email: { type: String, required: true },
    details: { type: String },
    quantity: { type: Number, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
