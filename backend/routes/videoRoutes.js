import express from "express";
import videoController from "../controllers/videoController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("video"),
  videoController.uploadVideo
);
router.get("/", videoController.getAllVideos);
router.get("/:id", videoController.getVideoById);
router.put("/:id/like", protect, videoController.likeVideo);
router.post("/:id/comment", protect, videoController.addComment);

export default router;
