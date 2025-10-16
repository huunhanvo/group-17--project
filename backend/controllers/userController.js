// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET: Lấy danh sách tất cả người dùng với filtering và pagination
exports.getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, role, search } = req.query;

        // Build query object
        let query = {};

        // Filter by role if provided
        if (role && ['user', 'moderator', 'admin'].includes(role)) {
            query.role = role;
        }

        // Search by name or email if provided
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        // Execute query with pagination
        const users = await User.find(query)
            .select("-password") // Không trả về password
            .sort({ createdAt: -1 }) // Mới nhất lên trước
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const totalUsers = await User.countDocuments(query);
        const totalPages = Math.ceil(totalUsers / limit);

        res.status(200).json({
            success: true,
            data: {
                users,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalUsers,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            }
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

// GET: Lấy thông tin user theo ID (Moderator+ hoặc chính chủ)
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
            data: { user }
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

// PUT: Cập nhật role user (Admin only)
exports.updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Validate role
        if (!['user', 'moderator', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Role không hợp lệ. Chỉ chấp nhận: user, moderator, admin"
            });
        }

        // Kiểm tra user có tồn tại không
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy user"
            });
        }

        // Không cho phép thay đổi role của chính mình
        if (req.user._id.toString() === id) {
            return res.status(400).json({
                success: false,
                message: "Không thể thay đổi role của chính bản thân"
            });
        }

        // Cập nhật role
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: `Đã cập nhật role thành công: ${user.name} → ${role}`,
            data: { user: updatedUser }
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
            message: `Đã xóa user thành công: ${user.name} (${user.email})`
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

// POST: Tạo user mới (Admin only)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role = 'user' } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email và password là bắt buộc"
            });
        }

        // Validate role
        if (!['user', 'moderator', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Role không hợp lệ. Chỉ chấp nhận: user, moderator, admin"
            });
        }

        // Kiểm tra email đã tồn tại chưa
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Email đã tồn tại"
            });
        }

        // Tạo mới user
        const newUser = new User({ name, email, password, role });
        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: "Tạo user thành công",
            data: {
                user: {
                    _id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    role: savedUser.role,
                    createdAt: savedUser.createdAt
                }
            }
        });
    } catch (err) {
        console.error("❌ Create user error:", err);
        res.status(500).json({
            success: false,
            message: "Lỗi khi tạo user",
            error: err.message
        });
    }
};

// GET: Thống kê users theo role (Admin only)
exports.getUserStats = async (req, res) => {
    try {
        const stats = await User.aggregate([
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                roleDistribution: stats,
                timestamp: new Date()
            }
        });
    } catch (err) {
        console.error("❌ Get user stats error:", err);
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy thống kê users",
            error: err.message
        });
    }
};

// POST: Tạo dữ liệu mẫu (Development only)
exports.createSampleUsers = async (req, res) => {
    try {
        // Kiểm tra xem đã có dữ liệu mẫu chưa
        const existingUsers = await User.countDocuments();
        if (existingUsers > 3) {
            return res.status(400).json({
                success: false,
                message: "Dữ liệu mẫu đã tồn tại hoặc đã có nhiều users"
            });
        }

        const sampleUsers = [
            {
                name: "Admin User",
                email: "admin@example.com",
                password: "123456",
                role: "admin"
            },
            {
                name: "Moderator User",
                email: "moderator@example.com",
                password: "123456",
                role: "moderator"
            },
            {
                name: "Regular User",
                email: "user@example.com",
                password: "123456",
                role: "user"
            },
            {
                name: "John Doe",
                email: "john@example.com",
                password: "123456",
                role: "user"
            },
            {
                name: "Jane Smith",
                email: "jane@example.com",
                password: "123456",
                role: "moderator"
            }
        ];

        const createdUsers = [];
        for (const userData of sampleUsers) {
            const existingUser = await User.findOne({ email: userData.email });
            if (!existingUser) {
                const user = new User(userData);
                const savedUser = await user.save();
                createdUsers.push({
                    name: savedUser.name,
                    email: savedUser.email,
                    role: savedUser.role
                });
            }
        }

        res.status(201).json({
            success: true,
            message: `Đã tạo ${createdUsers.length} users mẫu`,
            data: { users: createdUsers }
        });
    } catch (err) {
        console.error("❌ Create sample users error:", err);
        res.status(500).json({
            success: false,
            message: "Lỗi khi tạo dữ liệu mẫu",
            error: err.message
        });
    }
};
