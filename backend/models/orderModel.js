import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  }, // Index for user's orders
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }, // Make required true
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  paymentMethod: { type: String, required: true }, // e.g., credit card, PayPal
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
    index: true, // Index for payment status queries
  },
  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled", "returned"], // Added 'returned'
    default: "pending",
    index: true, // Index for order status queries
  },
  trackingNumber: { type: String }, // Optional: Add tracking number
  shippingCarrier: { type: String }, //Optional : add shipping carrier
  estimatedDelivery: { type: Date }, // Optional : Add estimated delivery date
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
