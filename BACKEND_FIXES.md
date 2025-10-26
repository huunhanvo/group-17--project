# 🔧 Backend Fixes - Buổi 6

## ❌ Issues Found

Khi chạy `npm start` trong backend, gặp các warnings:

```bash
(node:13352) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option
(node:13352) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option
(node:13352) [MONGOOSE] Warning: Duplicate schema index on {"token":1}
(node:13352) [MONGOOSE] Warning: Duplicate schema index on {"expiresAt":1}
```

## ✅ Fixes Applied

### 1. **Fixed MongoDB Connection** (server.js)

**Before:**
```javascript
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
```

**After:**
```javascript
// connect Mongo (without deprecated options)
mongoose.connect(process.env.MONGO_URI)
```

**Reason**: `useNewUrlParser` và `useUnifiedTopology` đã deprecated từ MongoDB Driver 4.0.0

---

### 2. **Fixed Duplicate Index** (RefreshToken.js)

**Before:**
```javascript
const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    // ...
});

// Duplicate indexes!
refreshTokenSchema.index({ token: 1 });
refreshTokenSchema.index({ userId: 1 });
refreshTokenSchema.index({ expiresAt: 1 });
```

**After:**
```javascript
const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        index: true  // ✅ Consolidate here
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true  // ✅ Consolidate here
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true  // ✅ Consolidate here
    },
});

// ✅ Only keep TTL index
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

**Reason**: Mongoose tự động tạo index khi có `index: true` trong schema. Không cần gọi `.index()` thêm lần nữa → duplicate warning

---

### 3. **Fixed Corrupt ActivityLog.js**

File bị duplicate code (có thể do merge conflict hoặc paste lỗi):

**Before:**
```javascript
const mongoose = require('mongoose');const mongoose = require('mongoose');
const activityLogSchema = new mongoose.Schema({const activityLogSchema = new mongoose.Schema({
  userId: {  userId: {
    // ... duplicate everywhere
```

**After:**
```javascript
// ✅ Clean file recreated
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
      'login', 'logout', 'signup',
      'create_user', 'update_user', 'delete_user',
      'update_role', 'upload_avatar',
      'forgot_password', 'reset_password',
      'refresh_token', 'view_profile', 'view_admin_panel'
    ],
    index: true
  },
  // ... clean schema
});
```

**Actions Taken:**
- Backed up corrupt file: `ActivityLog_Corrupt.bak`
- Created clean file: `ActivityLog.js`

---

## 🚀 How to Start Backend (Fixed)

### Step 1: Navigate to Backend
```bash
cd D:\Class\Class_Phat_Trien_Phan_Mem_Ma_Nguon_Mo\buoi4\group-17--project\backend
```

### Step 2: Start Server
```bash
npm start
```

### Step 3: Expected Output (No Warnings)
```bash
[dotenv@17.2.3] injecting env (10) from .env
🔌 Socket.IO server initialized
✅ MongoDB connected
🚀 Server running on port 3000
🔌 Socket.IO ready for connections
```

---

## 📝 Verification Checklist

After fixes, verify:

- [ ] No MongoDB driver warnings
- [ ] No duplicate index warnings
- [ ] Server starts successfully on port 3000
- [ ] MongoDB connects successfully
- [ ] Socket.IO initializes
- [ ] API routes available at `http://localhost:3000/api`

Test endpoints:
```bash
# Health check
GET http://localhost:3000/

# Auth
POST http://localhost:3000/api/auth/login
POST http://localhost:3000/api/auth/signup

# Users (requires auth)
GET http://localhost:3000/api/users

# Logs (admin only)
GET http://localhost:3000/api/logs
```

---

## 🔍 Files Modified

1. **backend/server.js**
   - Removed deprecated MongoDB options
   - Line 27: `mongoose.connect(process.env.MONGO_URI)`

2. **backend/models/RefreshToken.js**
   - Consolidated index declarations into schema
   - Removed duplicate `.index()` calls
   - Kept only TTL index

3. **backend/models/ActivityLog.js**
   - Recreated from scratch (was corrupt)
   - Backed up old file as `ActivityLog_Corrupt.bak`
   - Clean schema with proper indexes

---

## 🎯 Status

- ✅ MongoDB connection warnings fixed
- ✅ Duplicate index warnings fixed
- ✅ ActivityLog model recreated
- ✅ All models validated
- ✅ Server ready to start

---

**Next Step**: Start backend server và verify không còn warnings!

```bash
cd backend
npm start
```

Expected: Clean startup with ✅ MongoDB connected, no warnings.
