// routes/socket.js
const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
    getOnlineUsers,
    getOnlineUsersCount,
    isUserOnline,
    broadcastSystemAnnouncement,
    notifyAdmins,
    notifyUser
} = require('../socket/socketServer');

const router = express.Router();

// @desc    Get online users count
// @route   GET /socket/online-count
// @access  Protected
router.get('/online-count', protect, (req, res) => {
    try {
        const count = getOnlineUsersCount();
        const users = getOnlineUsers();

        res.json({
            success: true,
            onlineCount: count,
            onlineUserIds: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy thông tin users online',
            error: error.message
        });
    }
});

// @desc    Check if specific user is online
// @route   GET /socket/user-online/:userId
// @access  Protected
router.get('/user-online/:userId', protect, (req, res) => {
    try {
        const { userId } = req.params;
        const online = isUserOnline(userId);

        res.json({
            success: true,
            userId,
            isOnline: online
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi kiểm tra trạng thái user',
            error: error.message
        });
    }
});

// @desc    Send system announcement (Admin only)
// @route   POST /socket/system-announcement
// @access  Admin only
router.post('/system-announcement', protect, adminOnly, (req, res) => {
    try {
        const { message, type } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message là bắt buộc'
            });
        }

        broadcastSystemAnnouncement(message, type || 'info');

        res.json({
            success: true,
            message: 'Thông báo hệ thống đã được gửi',
            announcement: {
                message,
                type: type || 'info',
                sentBy: req.user.name,
                timestamp: new Date()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi gửi thông báo hệ thống',
            error: error.message
        });
    }
});

// @desc    Send notification to specific user (Admin only)
// @route   POST /socket/notify-user
// @access  Admin only
router.post('/notify-user', protect, adminOnly, (req, res) => {
    try {
        const { userId, message, type } = req.body;

        if (!userId || !message) {
            return res.status(400).json({
                success: false,
                message: 'userId và message là bắt buộc'
            });
        }

        const sent = notifyUser(userId, 'adminNotification', {
            message,
            type: type || 'info',
            fromAdmin: req.user.name
        });

        if (sent) {
            res.json({
                success: true,
                message: 'Thông báo đã được gửi đến user',
                notification: {
                    targetUserId: userId,
                    message,
                    type: type || 'info',
                    sentBy: req.user.name,
                    timestamp: new Date()
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User không online hoặc không tồn tại'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi gửi thông báo đến user',
            error: error.message
        });
    }
});

// @desc    Send notification to all admins
// @route   POST /socket/notify-admins
// @access  Admin only
router.post('/notify-admins', protect, adminOnly, (req, res) => {
    try {
        const { message, type } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message là bắt buộc'
            });
        }

        notifyAdmins('adminAlert', {
            message,
            type: type || 'info',
            fromAdmin: req.user.name
        });

        res.json({
            success: true,
            message: 'Thông báo đã được gửi đến tất cả admins',
            notification: {
                message,
                type: type || 'info',
                sentBy: req.user.name,
                timestamp: new Date()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi gửi thông báo đến admins',
            error: error.message
        });
    }
});

module.exports = router;