// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { loginLimiter, signupLimiter } = require("../middleware/rateLimiter");

// Public routes with rate limiting
router.post("/signup", signupLimiter, authController.signup);
router.post("/login", loginLimiter, authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refreshToken);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:resetToken", authController.resetPassword);

// Protected routes (yêu cầu đăng nhập)
router.get("/me", protect, authController.getMe);
router.put("/profile", protect, authController.updateProfile);
router.post("/upload-avatar", protect, authController.uploadAvatar);

module.exports = router;
