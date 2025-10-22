// routes/password.js
const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword } = require("../controllers/userController");

// @route   POST /password/forgot
// @desc    Gửi email reset password
// @access  Public
router.post("/forgot", forgotPassword);

// @route   POST /password/reset/:token
// @desc    Reset password với token
// @access  Public
router.post("/reset/:token", resetPassword);

module.exports = router;
