// controllers/authController.js
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { notifyAdmins } = require("../socket/socketServer");

// Helper function: Generate Access Token (short-lived)
const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "your_jwt_secret_key_2024", {
        expiresIn: "15m"  // Access token hết hạn sau 15 phút
    });
};

// Helper function: Generate Refresh Token (long-lived)
const generateRefreshToken = () => {
    return crypto.randomBytes(40).toString('hex');
};

// Helper function: Create and save refresh token
const createRefreshToken = async (userId, deviceInfo = '', ipAddress = '') => {
    const token = generateRefreshToken();

    const refreshToken = new RefreshToken({
        token,
        userId,
        deviceInfo,
        ipAddress,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    await refreshToken.save();
    return token;
};

// Helper function: Generate both tokens
const generateTokens = async (userId, deviceInfo = '', ipAddress = '') => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = await createRefreshToken(userId, deviceInfo, ipAddress);

    return { accessToken, refreshToken };
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

        // Tạo access token và refresh token
        const deviceInfo = req.get('User-Agent') || '';
        const ipAddress = req.ip || req.connection.remoteAddress || '';
        const tokens = await generateTokens(user._id, deviceInfo, ipAddress);

        // Notify admins về user mới đăng ký
        notifyAdmins('newUserRegistered', {
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            userRole: user.role,
            message: `Người dùng mới đăng ký: ${user.name} (${user.email})`
        });

        res.status(201).json({
            success: true,
            message: "Đăng ký thành công",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
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

        // Cleanup expired tokens for this user
        await RefreshToken.cleanupExpiredTokens(user._id);

        // Tạo access token và refresh token
        const deviceInfo = req.get('User-Agent') || '';
        const ipAddress = req.ip || req.connection.remoteAddress || '';
        const tokens = await generateTokens(user._id, deviceInfo, ipAddress);

        res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
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

// @desc    Đăng xuất và revoke refresh token
// @route   POST /auth/logout
// @access  Private
exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (refreshToken) {
            // Revoke the specific refresh token
            await RefreshToken.findOneAndUpdate(
                { token: refreshToken },
                { isRevoked: true }
            );
        }

        // If user is authenticated, revoke all tokens for this user
        if (req.user) {
            await RefreshToken.revokeAllTokensForUser(req.user._id);
        }

        res.status(200).json({
            success: true,
            message: "Đăng xuất thành công. Tất cả tokens đã được revoke."
        });
    } catch (error) {
        console.error("❌ Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server khi đăng xuất",
            error: error.message
        });
    }
};

// @desc    Refresh access token using refresh token
// @route   POST /auth/refresh
// @access  Public
exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token không được cung cấp"
            });
        }

        // Find refresh token in database
        const tokenDoc = await RefreshToken.findOne({
            token: refreshToken
        }).populate('userId');

        if (!tokenDoc) {
            return res.status(401).json({
                success: false,
                message: "Refresh token không hợp lệ"
            });
        }

        // Check if token is valid
        if (!tokenDoc.isValid()) {
            return res.status(401).json({
                success: false,
                message: "Refresh token đã hết hạn hoặc bị revoke"
            });
        }

        // Check if user still exists
        const user = await User.findById(tokenDoc.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User không tồn tại"
            });
        }

        // Generate new access token
        const newAccessToken = generateAccessToken(user._id);

        // Optionally generate new refresh token (rotate refresh tokens)
        const deviceInfo = req.get('User-Agent') || '';
        const ipAddress = req.ip || req.connection.remoteAddress || '';
        const newRefreshToken = await createRefreshToken(user._id, deviceInfo, ipAddress);

        // Revoke the old refresh token
        tokenDoc.isRevoked = true;
        await tokenDoc.save();

        res.status(200).json({
            success: true,
            message: "Token đã được refresh thành công",
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error("❌ Refresh token error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi server khi refresh token",
            error: error.message
        });
    }
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

// @desc    Cập nhật thông tin cá nhân (Profile)
// @route   PUT /auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy user"
            });
        }

        // Các trường có thể cập nhật
        const { name, email, currentPassword, newPassword, avatar } = req.body;

        // Cập nhật name nếu có
        if (name && name !== user.name) {
            if (name.trim().length < 3) {
                return res.status(400).json({
                    success: false,
                    message: "Tên phải có ít nhất 3 ký tự"
                });
            }
            user.name = name.trim();
        }

        // Cập nhật email nếu có
        if (email && email !== user.email) {
            // Kiểm tra email đã tồn tại chưa
            const emailExists = await User.findOne({ email: email.toLowerCase() });
            if (emailExists && emailExists._id.toString() !== user._id.toString()) {
                return res.status(400).json({
                    success: false,
                    message: "Email đã được sử dụng bởi tài khoản khác"
                });
            }
            user.email = email.toLowerCase();
        }

        // Cập nhật password nếu có
        if (newPassword) {
            // Yêu cầu nhập mật khẩu hiện tại để xác thực
            if (!currentPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng nhập mật khẩu hiện tại để đổi mật khẩu mới"
                });
            }

            // Kiểm tra mật khẩu hiện tại có đúng không
            const isPasswordMatch = await user.comparePassword(currentPassword);
            if (!isPasswordMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Mật khẩu hiện tại không đúng"
                });
            }

            // Validate password mới
            if (newPassword.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "Mật khẩu mới phải có ít nhất 6 ký tự"
                });
            }

            user.password = newPassword; // Sẽ tự động hash nhờ pre-save hook
        }

        // Cập nhật avatar nếu có
        if (avatar !== undefined) {
            user.avatar = avatar;
        }

        // Lưu user
        await user.save();

        res.status(200).json({
            success: true,
            message: "Cập nhật thông tin thành công",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.error("❌ Update profile error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật thông tin",
            error: error.message
        });
    }
};

// @desc    Quên mật khẩu - Gửi reset token
// @route   POST /auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp email"
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy user với email này"
            });
        }

        // Tạo reset token
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        // Trong thực tế, bạn sẽ gửi email chứa link reset
        // Ở đây chỉ trả về token để demo
        res.status(200).json({
            success: true,
            message: "Reset token đã được tạo. Trong thực tế, token sẽ được gửi qua email.",
            resetToken: resetToken, // CHỈ ĐỂ DEMO - Thực tế không trả về
            resetUrl: `http://localhost:3000/reset-password/${resetToken}`
        });
    } catch (error) {
        console.error("❌ Forgot password error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi xử lý quên mật khẩu",
            error: error.message
        });
    }
};

// @desc    Reset mật khẩu với token
// @route   POST /auth/reset-password/:resetToken
// @access  Public
exports.resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const resetToken = req.params.resetToken;

        if (!newPassword) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp mật khẩu mới"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu phải có ít nhất 6 ký tự"
            });
        }

        // Hash token từ URL để so sánh với DB
        const crypto = require("crypto");
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Tìm user với token và kiểm tra expiry
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Token không hợp lệ hoặc đã hết hạn"
            });
        }

        // Đặt mật khẩu mới
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Đổi mật khẩu thành công. Bạn có thể đăng nhập với mật khẩu mới."
        });
    } catch (error) {
        console.error("❌ Reset password error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi reset mật khẩu",
            error: error.message
        });
    }
};

// @desc    Upload avatar
// @route   POST /auth/upload-avatar
// @access  Private
exports.uploadAvatar = async (req, res) => {
    try {
        const { avatar } = req.body;

        if (!avatar) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp URL ảnh hoặc base64"
            });
        }

        // Cập nhật avatar cho user
        const user = await User.findById(req.user._id);
        user.avatar = avatar;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Cập nhật avatar thành công",
            avatar: user.avatar
        });
    } catch (error) {
        console.error("❌ Upload avatar error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi upload avatar",
            error: error.message
        });
    }
};
