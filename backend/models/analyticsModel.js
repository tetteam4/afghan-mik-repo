import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  action: {
    type: String,
    enum: ["view", "add_to_cart", "purchase"],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
