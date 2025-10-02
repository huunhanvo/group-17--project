// controllers/userController.js
const User = require("../models/User");

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
