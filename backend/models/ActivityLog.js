const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'login',
      'logout',
      'signup',
      'create_user',
      'update_user',
      'delete_user',
      'update_role',
      'upload_avatar',
      'forgot_password',
      'reset_password',
      'refresh_token',
      'view_profile',
      'view_admin_panel'
    ],
    index: true
  },
  details: {
    type: String,
    default: ''
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
    // Removed index: true to avoid duplicate with TTL index below
  },
  targetUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'warning'],
    default: 'success'
  }
});

// Index compound cho query nhanh
activityLogSchema.index({ userId: 1, timestamp: -1 });
activityLogSchema.index({ action: 1, timestamp: -1 });

// TTL index: Xóa logs cũ hơn 90 ngày tự động
activityLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

// Static method: Lấy logs của user
activityLogSchema.statics.getUserLogs = async function(userId, options = {}) {
  const {
    limit = 50,
    skip = 0,
    action = null,
    startDate = null,
    endDate = null
  } = options;

  const query = { userId };
  
  if (action) {
    query.action = action;
  }
  
  if (startDate || endDate) {
    query.timestamp = {};
    if (startDate) query.timestamp.$gte = new Date(startDate);
    if (endDate) query.timestamp.$lte = new Date(endDate);
  }

  return this.find(query)
    .populate('userId', 'name email role')
    .populate('targetUserId', 'name email')
    .sort({ timestamp: -1 })
    .limit(limit)
    .skip(skip);
};

// Static method: Lấy tất cả logs (Admin only)
activityLogSchema.statics.getAllLogs = async function(options = {}) {
  const {
    limit = 100,
    skip = 0,
    action = null,
    userId = null,
    startDate = null,
    endDate = null
  } = options;

  const query = {};
  
  if (userId) {
    query.userId = userId;
  }
  
  if (action) {
    query.action = action;
  }
  
  if (startDate || endDate) {
    query.timestamp = {};
    if (startDate) query.timestamp.$gte = new Date(startDate);
    if (endDate) query.timestamp.$lte = new Date(endDate);
  }

  return this.find(query)
    .populate('userId', 'name email role')
    .populate('targetUserId', 'name email')
    .sort({ timestamp: -1 })
    .limit(limit)
    .skip(skip);
};

// Static method: Đếm logs theo action
activityLogSchema.statics.getStatsByAction = async function(userId = null) {
  const match = userId ? { userId: new mongoose.Types.ObjectId(userId) } : {};
  
  return this.aggregate([
    { $match: match },
    {
      $group: {
        _id: '$action',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);
};

module.exports = mongoose.model('ActivityLog', activityLogSchema);
