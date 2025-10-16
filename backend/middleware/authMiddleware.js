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

// Middleware kiểm tra một hoặc nhiều role cụ thể
exports.checkRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Vui lòng đăng nhập để tiếp tục"
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Chỉ ${roles.join(', ')} mới có quyền truy cập tính năng này`,
                requiredRoles: roles,
                userRole: req.user.role
            });
        }

        next();
    };
};

// Middleware kiểm tra role Moderator trở lên (moderator + admin)
exports.moderatorOrAbove = (req, res, next) => {
    const allowedRoles = ['moderator', 'admin'];

    if (req.user && allowedRoles.includes(req.user.role)) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Cần quyền Moderator trở lên để thực hiện hành động này",
            requiredRoles: allowedRoles,
            userRole: req.user?.role || null
        });
    }
};

// Middleware kiểm tra quyền chỉnh sửa resource (owner hoặc admin)
exports.ownerOrAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Vui lòng đăng nhập để tiếp tục"
        });
    }

    // Admin có thể truy cập tất cả
    if (req.user.role === 'admin') {
        return next();
    }

    // Kiểm tra xem user có phải là owner của resource không
    const resourceUserId = req.params.userId || req.params.id;
    if (req.user._id.toString() === resourceUserId) {
        return next();
    }

    return res.status(403).json({
        success: false,
        message: "Bạn chỉ có thể chỉnh sửa thông tin của chính mình hoặc cần quyền Admin"
    });
};

// Middleware ghi log hoạt động theo role
exports.logActivity = (action) => {
    return (req, res, next) => {
        if (req.user) {
            console.log(`📋 [${new Date().toISOString()}] ${req.user.role.toUpperCase()} ${req.user.name} (${req.user.email}) performed: ${action}`);
        }
        next();
    };
};
