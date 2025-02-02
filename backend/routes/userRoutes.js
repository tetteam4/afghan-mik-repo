import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", userController.signupUser);
router.post("/signin", userController.signinUser);
router.post("/logout", userController.logoutUser);
export default router;
