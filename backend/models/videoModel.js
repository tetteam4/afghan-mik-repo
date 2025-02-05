import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  videoUrl: { type: String, required: true }, // URL to video file (e.g., Cloudinary)
  imageUrl: String, // URL to thumbnail image
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
