// backend/routes/userRoutes.js
import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", userController.signupUser);
router.post("/signin", userController.signinUser);
router.post("/logout", userController.logoutUser);

router.get("/", userController.getAllUsers);
router.put("/:id", userController.editUser);
router.delete("/:id", userController.deleteUser);

export default router;
