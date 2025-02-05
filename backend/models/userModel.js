import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true }, // Index for faster lookups
  email: { type: String, required: true, unique: true, index: true }, // Index for faster lookups
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "seller", "admin"],
    default: "user",
    index: true,
  }, // Index for role-based queries
  profile: {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    avatar: { type: String, default: "" }, // URL to avatar image
    dateOfBirth: { type: Date },
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
