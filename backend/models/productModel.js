import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true }, // Index for text search
  description: { type: String, required: true },
  price: { type: Number, required: true, index: true }, // Index for price range queries
  category: { type: String, required: true, index: true }, // Index for category filtering
  brand: { type: String, index: true }, //Index for brand filtering
  images: [String], // Array of image URLs
  stock: { type: Number, default: 0 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }, // Index for seller's products
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      review: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  averageRating: { type: Number, default: 0, index: true }, // Index for sorting by rating
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
export default Product;


// e