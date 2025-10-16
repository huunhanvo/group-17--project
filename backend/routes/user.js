// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
    protect,
    adminOnly,
    checkRole,
    moderatorOrAbove,
    ownerOrAdmin,
    logActivity
} = require("../middleware/authMiddleware");

// GET: Lấy danh sách users với filtering (Moderator+)
router.get("/",
    protect,
    moderatorOrAbove,
    logActivity("VIEW_USERS_LIST"),
    userController.getAllUsers
);

// GET: Lấy thông tin user theo ID (Moderator+ hoặc chính chủ)
router.get("/:id",
    protect,
    ownerOrAdmin,
    logActivity("VIEW_USER_DETAIL"),
    userController.getUserById
);

// POST: Tạo user mới (Admin only)
router.post("/",
    protect,
    adminOnly,
    logActivity("CREATE_USER"),
    userController.createUser
);

// PUT: Cập nhật role user (Admin only) 
router.put("/:id/role",
    protect,
    adminOnly,
    logActivity("UPDATE_USER_ROLE"),
    userController.updateUserRole
);

// DELETE: Xóa user (Admin only)
router.delete("/:id",
    protect,
    adminOnly,
    logActivity("DELETE_USER"),
    userController.deleteUser
);

// GET: Thống kê users (Admin only)
router.get("/admin/stats",
    protect,
    adminOnly,
    logActivity("VIEW_USER_STATS"),
    userController.getUserStats
);

// POST: Tạo dữ liệu mẫu (Admin only - development)
router.post("/admin/sample-data",
    protect,
    adminOnly,
    logActivity("CREATE_SAMPLE_DATA"),
    userController.createSampleUsers
);

module.exports = router;
