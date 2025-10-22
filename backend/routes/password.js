// routes/password.js
const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword } = require("../controllers/userController");
const { forgotPasswordLimiter } = require("../middleware/rateLimiter");

// @route   POST /password/forgot
// @desc    Gửi email reset password
// @access  Public
router.post("/forgot", forgotPasswordLimiter, forgotPassword);

// @route   POST /password/reset/:token
// @desc    Reset password với token
// @access  Public
router.post("/reset/:token", resetPassword);

module.exports = router;
