import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  storeName: { type: String, required: true },
  businessAddress: String,
  taxId: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  performanceMetrics: {
    totalSales: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
