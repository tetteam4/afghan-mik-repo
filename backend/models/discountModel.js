import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ["percentage", "fixed"], required: true },
  value: { type: Number, required: true }, // e.g., 10% or $10
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  maxUses: { type: Number, default: null }, // Null means unlimited
  usedCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
