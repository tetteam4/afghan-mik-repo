// backend/models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., electronics, fashion
  brand: String,
  images: [String], // Array of image URLs
  stock: { type: Number, default: 0 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For marketplace model
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      review: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
