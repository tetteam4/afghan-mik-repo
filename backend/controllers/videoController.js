import Video from "../models/videoModel.js";
import cloudinary from "../config/cloudinaryConfig.js";
const videoController = {
  uploadVideo: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No video file uploaded" });
      }
      console.log("The user object", req.user);

      if (!req.user || !req.user._id) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not authenticated" });
      }
      const userId = req.user._id;
      const newVideo = new Video({
        userId: userId,
        title: req.body.title,
        description: req.body.description,
        videoUrl: req.file.path,
      });
      const savedVideo = await newVideo.save();
      res.status(201).json(savedVideo);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error creating video", error: error.message });
    }
  },
  getAllVideos: async (req, res) => {
    try {
      const videos = await Video.find({}).sort({ createdAt: -1 }); // Get all videos, sorted by most recent
      res.json(videos);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching videos", error: error.message });
    }
  },

  getVideoById: async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      res.json(video);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching video", error: error.message });
    }
  },

  likeVideo: async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      const userId = req.user.id;

      // Check if the user has already liked the video
      const likedIndex = video.likes.indexOf(userId);

      if (likedIndex === -1) {
        // User hasn't liked the video, add their ID to the likes array
        video.likes.push(userId);
      } else {
        // User has already liked the video, remove their ID from the likes array (unlike)
        video.likes.splice(likedIndex, 1);
      }

      await video.save();
      res.json({ message: "Video liked/unliked successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error liking/unliking video", error: error.message });
    }
  },

  addComment: async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      const { text } = req.body;
      const userId = req.user.id;

      const newComment = { userId, text, createdAt: new Date() };
      video.comments.push(newComment);
      await video.save();

      res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error adding comment", error: error.message });
    }
  },
};

export default videoController;
