const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');
const { protect, checkRole } = require('../middleware/authMiddleware');
const logger = require('../config/logger');  // Fixed: utils -> config

/**
 * @route   GET /api/logs
 * @desc    Lấy tất cả logs (Admin only)
 * @access  Private (Admin)
 */
router.get('/', protect, checkRole('admin'), async (req, res) => {
  try {
    const {
      limit = 100,
      skip = 0,
      action,
      userId,
      startDate,
      endDate
    } = req.query;

    const logs = await ActivityLog.getAllLogs({
      limit: parseInt(limit),
      skip: parseInt(skip),
      action,
      userId,
      startDate,
      endDate
    });

    const total = await ActivityLog.countDocuments(
      action ? { action } : {}
    );

    logger.info(`📊 Admin ${req.user.email} fetched ${logs.length} logs`);

    res.json({
      success: true,
      data: logs,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: total > parseInt(skip) + logs.length
      }
    });
  } catch (error) {
    logger.error('❌ Error fetching logs:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy logs',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/logs/user/:userId
 * @desc    Lấy logs của một user cụ thể
 * @access  Private (Admin hoặc chính user đó)
 */
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50, skip = 0, action, startDate, endDate } = req.query;

    // Kiểm tra quyền: Admin hoặc chính user đó
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền xem logs của user khác'
      });
    }

    const logs = await ActivityLog.getUserLogs(userId, {
      limit: parseInt(limit),
      skip: parseInt(skip),
      action,
      startDate,
      endDate
    });

    const total = await ActivityLog.countDocuments({ userId });

    logger.info(`📊 User ${req.user.email} fetched ${logs.length} logs for user ${userId}`);

    res.json({
      success: true,
      data: logs,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: total > parseInt(skip) + logs.length
      }
    });
  } catch (error) {
    logger.error('❌ Error fetching user logs:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy logs của user',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/logs/stats
 * @desc    Lấy thống kê logs (Admin only)
 * @access  Private (Admin)
 */
router.get('/stats', protect, checkRole('admin'), async (req, res) => {
  try {
    const { userId } = req.query;

    const stats = await ActivityLog.getStatsByAction(userId);

    logger.info(`📊 Admin ${req.user.email} fetched activity stats`);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('❌ Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thống kê logs',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/logs/cleanup
 * @desc    Xóa logs cũ hơn X ngày (Admin only)
 * @access  Private (Admin)
 */
router.delete('/cleanup', protect, checkRole('admin'), async (req, res) => {
  try {
    const { days = 90 } = req.body;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));

    const result = await ActivityLog.deleteMany({
      timestamp: { $lt: cutoffDate }
    });

    logger.info(`🗑️ Admin ${req.user.email} cleaned up ${result.deletedCount} old logs (older than ${days} days)`);

    res.json({
      success: true,
      message: `Đã xóa ${result.deletedCount} logs cũ hơn ${days} ngày`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    logger.error('❌ Error cleaning up logs:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa logs cũ',
      error: error.message
    });
  }
});

module.exports = router;
