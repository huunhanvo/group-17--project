// controllers/userController.js
const User = require("../models/User");

// GET: Lấy danh sách tất cả người dùng (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password") // Không trả về password
            .sort({ createdAt: -1 }); // Mới nhất lên trước

        res.status(200).json({
            success: true,
            count: users.length,
            users: users
        });
    } catch (err) {
        console.error("❌ Get all users error:", err);
        res.status(500).json({ 
            success: false,
            message: "Lỗi khi lấy danh sách users",
            error: err.message 
        });
    }
};

// GET: Lấy thông tin user theo ID (Admin, Moderator hoặc chính user đó)
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select("-password");
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy user"
            });
        }

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (err) {
        console.error("❌ Get user by ID error:", err);
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy thông tin user",
            error: err.message
        });
    }
};

// PUT: Cập nhật role của user (Admin only)
exports.updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Validate role
        if (!["user", "moderator", "admin"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Role không hợp lệ. Chỉ chấp nhận: user, moderator, admin"
            });
        }

        // Không cho phép tự thay đổi role của chính mình
        if (req.user._id.toString() === id) {
            return res.status(400).json({
                success: false,
                message: "Không thể thay đổi role của chính mình"
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy user"
            });
        }

        // Cập nhật role
        user.role = role;
        await user.save();

        res.status(200).json({
            success: true,
            message: `Đã cập nhật role thành ${role}`,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error("❌ Update user role error:", err);
        res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật role",
            error: err.message
        });
    }
};

// PUT: Cập nhật thông tin user (Self hoặc Admin)
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy user"
            });
        }

        // Cập nhật thông tin
        if (name) user.name = name;
        if (email) {
            // Kiểm tra email đã tồn tại chưa
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({
                    success: false,
                    message: "Email đã được sử dụng"
                });
            }
            user.email = email;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Cập nhật thông tin thành công",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error("❌ Update user error:", err);
        res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật user",
            error: err.message
        });
    }
};

// GET: Thống kê users theo role (Admin và Moderator)
exports.getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const adminCount = await User.countDocuments({ role: "admin" });
        const moderatorCount = await User.countDocuments({ role: "moderator" });
        const userCount = await User.countDocuments({ role: "user" });

        res.status(200).json({
            success: true,
            stats: {
                total: totalUsers,
                admin: adminCount,
                moderator: moderatorCount,
                user: userCount
            }
        });
    } catch (err) {
        console.error("❌ Get user stats error:", err);
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy thống kê",
            error: err.message
        });
    }
};


// DELETE: Xóa user (Admin only hoặc tự xóa)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra user có tồn tại không
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "Không tìm thấy user" 
            });
        }

        // Không cho phép xóa chính mình (Admin)
        if (req.user._id.toString() === id) {
            return res.status(400).json({
                success: false,
                message: "Không thể xóa chính bản thân"
            });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({ 
            success: true,
            message: "Đã xóa user thành công" 
        });
    } catch (err) {
        console.error("❌ Delete user error:", err);
        res.status(500).json({ 
            success: false,
            message: "Lỗi khi xóa user",
            error: err.message 
        });
    }
};

// GET: Lấy danh sách người dùng
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }); // mới nhất lên trước
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Lỗi server: " + err.message });
    }
};

// POST: Thêm người dùng mới
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Kiểm tra đầu vào
        if (!name || !email) {
            return res.status(400).json({ error: "Name và Email là bắt buộc" });
        }

        // Kiểm tra email đã tồn tại chưa
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: "Email đã tồn tại" });
        }

        // Tạo mới user
        const newUser = new User({ name, email });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: "Lỗi server: " + err.message });
    }
};
