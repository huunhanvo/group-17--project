const ActivityLog = require('../models/ActivityLog');
const logger = require('../config/logger');  // Fixed: utils -> config

/**
 * Middleware ghi log hoạt động người dùng
 * @param {string} action - Loại hành động (login, create_user, etc.)
 * @param {function} getDetails - Function trả về chi tiết log (optional)
 */
const logActivity = (action, getDetails = null) => {
  return async (req, res, next) => {
    // Lưu original res.json để intercept response
    const originalJson = res.json.bind(res);

    res.json = function(data) {
      // Chỉ log nếu request thành công (status 2xx)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // Chạy async log mà không block response
        setImmediate(async () => {
          try {
            const userId = req.user?.id || req.user?._id;
            
            if (!userId) {
              logger.warn(`Cannot log activity "${action}": No user ID found`);
              return;
            }

            const logData = {
              userId,
              action,
              details: getDetails ? getDetails(req, res, data) : '',
              ipAddress: req.ip || req.connection.remoteAddress || '',
              userAgent: req.get('user-agent') || '',
              timestamp: new Date(),
              status: 'success'
            };

            // Thêm targetUserId nếu có (cho các action liên quan đến user khác)
            if (req.params.id || req.body.userId) {
              logData.targetUserId = req.params.id || req.body.userId;
            }

            await ActivityLog.create(logData);
            logger.info(`✅ Activity logged: ${action} by user ${userId}`);
          } catch (error) {
            logger.error('❌ Failed to log activity:', error);
          }
        });
      }

      // Gọi original json response
      return originalJson(data);
    };

    next();
  };
};

/**
 * Log activity manually (dùng trong controller)
 * @param {object} data - { userId, action, details, targetUserId, status, ipAddress, userAgent }
 */
const logActivityManual = async (data) => {
  try {
    const logData = {
      userId: data.userId,
      action: data.action,
      details: data.details || '',
      ipAddress: data.ipAddress || '',
      userAgent: data.userAgent || '',
      timestamp: new Date(),
      targetUserId: data.targetUserId || null,
      status: data.status || 'success'
    };

    await ActivityLog.create(logData);
    logger.info(`✅ Manual activity logged: ${data.action} by user ${data.userId}`);
  } catch (error) {
    logger.error('❌ Failed to log activity manually:', error);
  }
};

/**
 * Log failed login attempts (không cần auth)
 */
const logFailedLogin = async (email, ipAddress, userAgent, reason) => {
  try {
    // Tìm user theo email để lấy userId (nếu tồn tại)
    const User = require('../models/User');
    const user = await User.findOne({ email });

    if (user) {
      await ActivityLog.create({
        userId: user._id,
        action: 'login',
        details: `Failed login attempt: ${reason}`,
        ipAddress,
        userAgent,
        timestamp: new Date(),
        status: 'failed'
      });
      logger.warn(`⚠️ Failed login logged for user: ${email}`);
    }
  } catch (error) {
    logger.error('❌ Failed to log failed login:', error);
  }
};

module.exports = {
  logActivity,
  logActivityManual,
  logFailedLogin
};
