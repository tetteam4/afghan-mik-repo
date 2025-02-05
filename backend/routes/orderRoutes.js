// backend/routes/orderRoutes.js
import express from "express";
import orderController from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js"; // Example auth middleware

const router = express.Router();

router.post("/", protect, orderController.createOrder); // Protect this route
router.get("/:id", protect, orderController.getOrderById); // Protect this route
router.put("/:id", protect, orderController.updateOrder); // Protect this route (maybe admin only?)
router.delete("/:id", protect, orderController.deleteOrder); // Protect this route (maybe admin only?)
router.get("/", protect, orderController.getAllOrders); // Protect this route (maybe admin only, or user-specific)

export default router;
