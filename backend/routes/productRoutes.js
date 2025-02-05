// backend/routes/productRoutes.js
import express from "express";
import productController from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", productController.getProducts);
router.post("/", protect, productController.createProduct); // Seller must be authenticated
router.get("/:id", productController.getProductById);
router.put("/:id", protect, productController.updateProduct); // Seller or Admin
router.delete("/:id", protect, productController.deleteProduct); // Seller or Admin

export default router;
