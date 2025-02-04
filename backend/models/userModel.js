// backend/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "seller", "admin"], default: "user" },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    avatar: String,
  },
  socialMedia: {
    googleId: String,
    facebookId: String,
  },
  twoFactorAuth: {
    enabled: { type: Boolean, default: false },
    secret: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);
export default User;