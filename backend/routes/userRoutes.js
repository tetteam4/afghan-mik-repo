import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", userController.signupUser);
router.post("/signin", userController.signinUser);
router.post("/logout", userController.logoutUser);
router.get("/", userController.getAllUsers);
router.put("/:id", userController.editUser);
router.delete("/:id", userController.deleteUser);
//Social logins
router.post("/google-auth", userController.googleAuth);
router.post("/facebook-auth", userController.facebookAuth);
router.post("/enable-two-factor", userController.enableTwoFactorAuth);
router.post("/verify-two-factor", userController.verifyTwoFactorAuth);
router.post("/disable-two-factor", userController.disableTwoFactorAuth);
export default router;
