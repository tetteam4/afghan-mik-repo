import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  permissions: {
    manageUsers: { type: Boolean, default: false },
    manageProducts: { type: Boolean, default: false },
    manageOrders: { type: Boolean, default: false },
    manageDiscounts: { type: Boolean, default: false },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
