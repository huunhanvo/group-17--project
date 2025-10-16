const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    },
    isRevoked: {
        type: Boolean,
        default: false
    },
    deviceInfo: {
        type: String,
        default: ''
    },
    ipAddress: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Index for efficient queries
refreshTokenSchema.index({ token: 1 });
refreshTokenSchema.index({ userId: 1 });
refreshTokenSchema.index({ expiresAt: 1 });

// Remove expired tokens automatically
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Instance method to check if token is valid
refreshTokenSchema.methods.isValid = function () {
    return !this.isRevoked && this.expiresAt > new Date();
};

// Static method to cleanup expired tokens for a user
refreshTokenSchema.statics.cleanupExpiredTokens = async function (userId) {
    return this.deleteMany({
        userId,
        $or: [
            { expiresAt: { $lte: new Date() } },
            { isRevoked: true }
        ]
    });
};

// Static method to revoke all tokens for a user
refreshTokenSchema.statics.revokeAllTokensForUser = async function (userId) {
    return this.updateMany(
        { userId, isRevoked: false },
        { isRevoked: true }
    );
};

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);