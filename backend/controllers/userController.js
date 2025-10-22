// controllers/userController.js
const User = require("../models/User");
const { uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");
const { sendResetPasswordEmail } = require("../config/email");
const crypto = require("crypto");

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

// POST: Upload avatar
exports.uploadAvatar = async (req, res) => {
    try {
        // Kiểm tra có file không
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng chọn file ảnh"
            });
        }

        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy user"
            });
        }

        // Nếu user đã có avatar trên Cloudinary, xóa ảnh cũ
        if (user.avatar && user.avatar.includes('cloudinary')) {
            try {
                // Lấy public_id từ URL cloudinary
                const urlParts = user.avatar.split('/');
                const publicIdWithExt = urlParts[urlParts.length - 1];
                const publicId = `avatars/${publicIdWithExt.split('.')[0]}`;
                
                await deleteFromCloudinary(publicId);
                console.log('✅ Đã xóa avatar cũ trên Cloudinary');
            } catch (error) {
                console.error('⚠️  Lỗi khi xóa avatar cũ:', error.message);
                // Không return error, tiếp tục upload ảnh mới
            }
        }

        // Upload ảnh lên Cloudinary
        const result = await uploadToCloudinary(req.file.buffer, 'avatars');

        // Cập nhật URL avatar trong database
        user.avatar = result.secure_url;
        await user.save();

        console.log('✅ Avatar uploaded successfully:', result.secure_url);

        res.status(200).json({
            success: true,
            message: "Upload avatar thành công",
            avatar: result.secure_url,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error('❌ Upload avatar error:', error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi upload avatar",
            error: error.message
        });
    }
};

// DELETE: Xóa avatar
exports.deleteAvatar = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy user"
            });
        }

        if (!user.avatar) {
            return res.status(400).json({
                success: false,
                message: "User chưa có avatar"
            });
        }

        // Xóa avatar trên Cloudinary
        if (user.avatar.includes('cloudinary')) {
            try {
                const urlParts = user.avatar.split('/');
                const publicIdWithExt = urlParts[urlParts.length - 1];
                const publicId = `avatars/${publicIdWithExt.split('.')[0]}`;
                
                await deleteFromCloudinary(publicId);
                console.log('✅ Đã xóa avatar trên Cloudinary');
            } catch (error) {
                console.error('⚠️  Lỗi khi xóa avatar:', error.message);
            }
        }

        // Xóa URL avatar trong database
        user.avatar = "";
        await user.save();

        res.status(200).json({
            success: true,
            message: "Đã xóa avatar",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error('❌ Delete avatar error:', error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi xóa avatar",
            error: error.message
        });
    }
};

// POST: Forgot Password - Gửi email reset password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập email"
            });
        }

        // Tìm user theo email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy email này trong hệ thống"
            });
        }

        // Tạo reset token
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        // Gửi email
        try {
            await sendResetPasswordEmail(user.email, resetToken);

            res.status(200).json({
                success: true,
                message: "Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.",
                email: user.email
            });

        } catch (emailError) {
            // Nếu gửi email thất bại, xóa token
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            return res.status(500).json({
                success: false,
                message: "Không thể gửi email. Vui lòng thử lại sau.",
                error: emailError.message
            });
        }

    } catch (error) {
        console.error('❌ Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi xử lý yêu cầu",
            error: error.message
        });
    }
};

// POST: Reset Password - Đặt lại mật khẩu với token
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập mật khẩu mới"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu phải có ít nhất 6 ký tự"
            });
        }

        // Hash token từ URL để so sánh với database
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Tìm user với token và kiểm tra còn hạn không
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() } // Token chưa hết hạn
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Token không hợp lệ hoặc đã hết hạn"
            });
        }

        // Cập nhật mật khẩu mới
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập với mật khẩu mới."
        });

    } catch (error) {
        console.error('❌ Reset password error:', error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi đặt lại mật khẩu",
            error: error.message
        });
    }
};

