// routes/avatar.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { upload, resizeAvatar } = require("../middleware/uploadMiddleware");

// POST: Upload avatar (yêu cầu đăng nhập)
// Multer xử lý upload -> Sharp resize -> Cloudinary
router.post(
    "/upload",
    protect,
    upload.single('avatar'),
    resizeAvatar,
    userController.uploadAvatar
);

// DELETE: Xóa avatar (yêu cầu đăng nhập)
router.delete(
    "/delete",
    protect,
    userController.deleteAvatar
);

module.exports = router;
