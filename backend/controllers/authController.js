// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper function: Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "your_jwt_secret_key_2024", {
        expiresIn: "30d"  // Token hết hạn sau 30 ngày
    });
};

// @desc    Đăng ký tài khoản mới
// @route   POST /auth/signup
// @access  Public
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp đầy đủ thông tin: name, email, password"
            });
        }

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email đã được sử dụng"
            });
        }

        // Tạo user mới
        const user = await User.create({
            name,
            email,
            password,  // Password sẽ tự động được hash nhờ pre-save hook
            role: role || "user"  // Mặc định là user
        });

        // Tạo token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "Đăng ký thành công",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error("❌ Signup error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server khi đăng ký",
            error: error.message
        });
    }
};

// @desc    Đăng nhập
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp email và password"
            });
        }

        // Tìm user (bao gồm cả password)
        const user = await User.findOne({ email }).select("+password");
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không đúng"
            });
        }

        // Kiểm tra password
        const isPasswordMatch = await user.comparePassword(password);
        
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không đúng"
            });
        }

        // Tạo token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server khi đăng nhập",
            error: error.message
        });
    }
};

// @desc    Đăng xuất (client-side sẽ xóa token)
// @route   POST /auth/logout
// @access  Public
exports.logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Đăng xuất thành công. Vui lòng xóa token ở client."
    });
};

// @desc    Lấy thông tin user hiện tại (từ token)
// @route   GET /auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        // req.user đã được set từ protect middleware
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error("❌ Get me error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy thông tin user",
            error: error.message
        });
    }
};
