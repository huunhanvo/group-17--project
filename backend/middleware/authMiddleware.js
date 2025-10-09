// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware bảo vệ route (yêu cầu đăng nhập)
exports.protect = async (req, res, next) => {
    let token;

    // Kiểm tra xem có token trong header không
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Lấy token từ header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key_2024");

            // Lấy thông tin user từ token (không lấy password)
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ 
                    success: false,
                    message: "Người dùng không tồn tại" 
                });
            }

            next();
        } catch (error) {
            console.error("❌ Token verification failed:", error.message);
            return res.status(401).json({ 
                success: false,
                message: "Token không hợp lệ hoặc đã hết hạn" 
            });
        }
    }

    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: "Không có token, truy cập bị từ chối" 
        });
    }
};

// Middleware kiểm tra role Admin
exports.adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ 
            success: false,
            message: "Chỉ Admin mới có quyền truy cập" 
        });
    }
};
