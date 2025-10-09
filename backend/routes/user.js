// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes (tạm thời giữ để tương thích với code cũ)
router.post("/", userController.createUser);

// Admin only routes - yêu cầu đăng nhập VÀ là Admin
router.get("/", protect, adminOnly, userController.getAllUsers);
router.delete("/:id", protect, adminOnly, userController.deleteUser);

module.exports = router;
