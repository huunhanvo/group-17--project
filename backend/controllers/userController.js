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
