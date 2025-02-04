// backend/controllers/userController.js
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import qrcode from "qrcode";

const generateToken = (res, id) => {

  const JWT_SECRET="hussain"
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  return token;
};
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    generateToken(res, savedUser._id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        profile: savedUser.profile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(res, user._id);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Set to a past date to delete
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
  res.status(200).json({ message: "User logged out successfully" });
};

//Get All Users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, firstName, lastName, phone, address } =
      req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        role,
        profile: { firstName, lastName, phone, address },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const googleAuth = async (req, res) => {
  // Handle Google authentication logic here
  res.status(501).json({ message: "Google authentication not implemented" });
};

const facebookAuth = async (req, res) => {
  // Handle Facebook authentication logic here
  res.status(501).json({ message: "Facebook authentication not implemented" });
};
// Enable two-factor authentication
const enableTwoFactorAuth = async (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.twoFactorAuth.enabled = true;
    user.twoFactorAuth.secret = secret.base32;
    await user.save();

    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) {
        console.error("Error generating QR code:", err);
        return res.status(500).json({ message: "Failed to generate QR code" });
      }
      res.json({
        message: "Two-factor authentication enabled",
        secret: secret.base32,
        qrCode: data_url,
      });
    });
  } catch (error) {
    console.error("Error enabling two-factor auth:", error);
    res
      .status(500)
      .json({ message: "Failed to enable two-factor authentication" });
  }
};
// Verify two-factor authentication token
const verifyTwoFactorAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorAuth.secret,
      encoding: "base32",
      token: token,
    });

    if (verified) {
      res.json({ message: "Two-factor authentication verified successfully" });
    } else {
      res.status(400).json({ message: "Two-factor authentication failed" });
    }
  } catch (error) {
    console.error("Error verifying two-factor auth:", error);
    res
      .status(500)
      .json({ message: "Failed to verify two-factor authentication" });
  }
};

// Disable two-factor authentication
const disableTwoFactorAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.twoFactorAuth.enabled = false;
    user.twoFactorAuth.secret = null;
    await user.save();

    res.json({ message: "Two-factor authentication disabled successfully" });
  } catch (error) {
    console.error("Error disabling two-factor auth:", error);
    res
      .status(500)
      .json({ message: "Failed to disable two-factor authentication" });
  }
};
export default {
  signupUser,
  signinUser,
  logoutUser,
  getAllUsers,
  editUser,
  deleteUser,
  googleAuth,
  facebookAuth,
  enableTwoFactorAuth,
  verifyTwoFactorAuth,
  disableTwoFactorAuth,
};
