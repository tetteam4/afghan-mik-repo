// backend/routes/wishlistRoutes.js
import express from "express";
import wishlistController from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, wishlistController.getWishlist);
router.post("/", protect, wishlistController.addProductToWishlist);
router.delete(
  "/:productId",
  protect,
  wishlistController.removeProductFromWishlist
);

export default router;
