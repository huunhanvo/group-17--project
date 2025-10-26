const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        index: true  // Consolidate index declaration here
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true  // Consolidate index declaration here
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        // Removed index: true to avoid duplicate with TTL index below
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

// TTL index: Remove expired tokens automatically (no duplicate)
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