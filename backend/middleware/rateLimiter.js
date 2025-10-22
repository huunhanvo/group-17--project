const rateLimit = require('express-rate-limit');
const logger = require('../config/logger');

// Rate limiter chung cho API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Tối đa 100 requests mỗi 15 phút
  message: {
    success: false,
    message: '⛔ Quá nhiều requests từ IP này. Vui lòng thử lại sau 15 phút.'
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: '⛔ Quá nhiều requests từ IP này. Vui lòng thử lại sau 15 phút.'
    });
  }
});

// Rate limiter nghiêm ngặt cho login (chống brute force)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // Tối đa 5 lần đăng nhập sai mỗi 15 phút
  skipSuccessfulRequests: true, // Không đếm request thành công
  message: {
    success: false,
    message: '🔒 Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau 15 phút.'
  },
  handler: (req, res) => {
    logger.warn(`Login rate limit exceeded for IP: ${req.ip}, Email: ${req.body.email}`);
    res.status(429).json({
      success: false,
      message: '🔒 Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau 15 phút.'
    });
  }
});

// Rate limiter cho signup (chống spam tạo tài khoản)
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 3, // Tối đa 3 tài khoản mỗi IP mỗi giờ
  message: {
    success: false,
    message: '🚫 Quá nhiều tài khoản được tạo từ IP này. Vui lòng thử lại sau 1 giờ.'
  },
  handler: (req, res) => {
    logger.warn(`Signup rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: '🚫 Quá nhiều tài khoản được tạo từ IP này. Vui lòng thử lại sau 1 giờ.'
    });
  }
});

// Rate limiter cho forgot password (chống spam email)
const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 3, // Tối đa 3 requests mỗi giờ
  message: {
    success: false,
    message: '📧 Quá nhiều yêu cầu reset password. Vui lòng thử lại sau 1 giờ.'
  },
  handler: (req, res) => {
    logger.warn(`Forgot password rate limit exceeded for IP: ${req.ip}, Email: ${req.body.email}`);
    res.status(429).json({
      success: false,
      message: '📧 Quá nhiều yêu cầu reset password. Vui lòng thử lại sau 1 giờ.'
    });
  }
});

// Rate limiter cho avatar upload
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 10, // Tối đa 10 uploads mỗi 15 phút
  message: {
    success: false,
    message: '⬆️ Quá nhiều uploads. Vui lòng thử lại sau 15 phút.'
  },
  handler: (req, res) => {
    logger.warn(`Upload rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: '⬆️ Quá nhiều uploads. Vui lòng thử lại sau 15 phút.'
    });
  }
});

module.exports = {
  apiLimiter,
  loginLimiter,
  signupLimiter,
  forgotPasswordLimiter,
  uploadLimiter
};
