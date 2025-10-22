// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, adminOnly, checkRole, adminOrModerator, selfOrAdmin } = require("../middleware/authMiddleware");

// Public routes (tạm thời giữ để tương thích với code cũ)
router.post("/", userController.createUser);

// ===== RBAC ROUTES =====

// 1. Lấy tất cả users - Chỉ Admin và Moderator
router.get("/", protect, checkRole("admin", "moderator"), userController.getAllUsers);

// 2. Lấy thống kê users - Chỉ Admin và Moderator
router.get("/stats", protect, checkRole("admin", "moderator"), userController.getUserStats);

// 3. Lấy thông tin user theo ID - Admin, Moderator hoặc chính user đó
router.get("/:id", protect, selfOrAdmin, userController.getUserById);

// 4. Cập nhật role của user - Chỉ Admin
router.put("/:id/role", protect, adminOnly, userController.updateUserRole);

// 5. Cập nhật thông tin user - Chính user đó hoặc Admin
router.put("/:id", protect, selfOrAdmin, userController.updateUser);

// 6. Xóa user - Chỉ Admin
router.delete("/:id", protect, adminOnly, userController.deleteUser);

module.exports = router;

