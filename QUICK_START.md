# ✅ Ứng Dụng Đang Chạy Thành Công!

## 🎯 Trạng Thái Hiện Tại

### Backend ✅
- **URL:** http://localhost:3000
- **Status:** Running
- **MongoDB:** Connected
- **Socket.IO:** Ready
- **Logs:** backend/logs/

### Frontend ✅ 
- **URL:** http://localhost:3001 (sẽ tự mở trình duyệt)
- **Status:** Compiled with warnings (không ảnh hưởng)
- **Hot Reload:** Enabled

---

## 🚀 Các Bước Tiếp Theo

### 1️⃣ Truy Cập Ứng Dụng
Mở trình duyệt tại: **http://localhost:3001**

### 2️⃣ Test Login với Các Role

#### 👨‍💼 Admin User
```
Email: admin@example.com
Password: admin123
```
**Quyền hạn:**
- ✅ Xem tất cả users
- ✅ Tạo/sửa/xóa users
- ✅ Đổi role users
- ✅ Truy cập Admin Panel
- ✅ Upload/delete avatar

#### 🛡️ Moderator User
```
Email: moderator@example.com
Password: mod123
```
**Quyền hạn:**
- ✅ Xem tất cả users (read-only)
- ✅ Truy cập Moderator Panel
- ❌ Không thể sửa/xóa users
- ✅ Upload/delete avatar riêng

#### 👤 Regular User
```
Email: user1@example.com
Password: user123
```
**Quyền hạn:**
- ✅ Xem profile của chính mình
- ❌ Không thể xem users khác
- ❌ Không truy cập được Admin/Moderator Panel
- ✅ Upload/delete avatar riêng

### 3️⃣ Test Các Chức Năng

#### ✅ Activity 2: RBAC
1. Login as **Admin** → Vào **Admin Panel**
2. Thử Create/Edit/Delete users
3. Thử đổi role của user
4. Logout → Login as **Moderator**
5. Vào **Moderator Panel** → Chỉ xem được, không sửa được
6. Logout → Login as **User** → Không có menu Admin/Moderator

#### ✅ Activity 3: Avatar Upload
**⚠️ Cần cấu hình Cloudinary trước:**
1. Đăng ký tại: https://cloudinary.com/
2. Copy credentials vào `backend/.env`:
   ```
   CLOUDINARY_CLOUD_NAME=dxxxxx
   CLOUDINARY_API_KEY=123456789
   CLOUDINARY_API_SECRET=abcdefgh
   ```
3. Restart backend: `Ctrl+C` → `node server.js`

**Test:**
1. Login với bất kỳ user nào
2. Vào **Profile** hoặc **Edit User**
3. Click **Choose File** → Chọn ảnh
4. Click **Upload Avatar**
5. Ảnh sẽ được resize 500x500, convert WebP, upload lên Cloudinary

#### ✅ Activity 4: Forgot Password
**⚠️ Cần cấu hình Gmail App Password trước:**
1. Vào Google Account → Security → 2-Step Verification
2. Tạo App Password
3. Copy vào `backend/.env`:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   FRONTEND_URL=http://localhost:3001
   ```
4. Restart backend

**Test:**
1. Ở trang Login, click **Forgot Password?**
2. Nhập email: `admin@example.com`
3. Click **Send Reset Link**
4. Check email của bạn
5. Click link trong email hoặc copy token
6. Nhập password mới
7. Login với password mới

#### ✅ Activity 5: Logging & Rate Limiting
**Test Logging:**
1. Backend console có màu sắc
2. Mở `backend/logs/combined.log` → Xem tất cả logs
3. Mở `backend/logs/error.log` → Chỉ có errors
4. Mở `backend/logs/http.log` → HTTP requests

**Test Rate Limiting:**
1. **Login limit:** Nhập sai password 6 lần → Bị block 15 phút
2. **Signup limit:** Tạo 4 accounts trong 1 giờ → Lần thứ 4 bị block
3. **Forgot Password limit:** Gửi 4 requests trong 1 giờ → Lần thứ 4 bị block
4. **Upload limit:** Upload 11 ảnh trong 15 phút → Lần thứ 11 bị block

---

## 📸 Chụp Screenshot cho Báo Cáo

### Activity 2: RBAC (17 ảnh)
**Postman/Thunder Client (7 ảnh):**
1. GET /api/users (Admin token)
2. POST /api/users (Create new user)
3. PUT /api/users/:id (Update user)
4. DELETE /api/users/:id (Delete user)
5. PUT /api/users/:id/role (Change role)
6. GET /api/users/profile/me (Own profile)
7. GET /api/users/:id (View other user - Moderator)

**Frontend (10 ảnh):**
1. Admin login
2. Admin Panel - User list
3. Admin Panel - Create user form
4. Admin Panel - Edit user form
5. Admin Panel - Delete confirmation
6. Moderator login
7. Moderator Panel - Read-only view
8. User login
9. User profile page
10. Access denied (User trying to access Admin Panel)

### Activity 3: Avatar Upload (6-8 ảnh)
1. Profile page before upload
2. Choose file dialog
3. Upload success message
4. Avatar displayed (resized)
5. Cloudinary dashboard showing uploaded image
6. Delete avatar confirmation
7. Rate limit error (after 10 uploads)
8. Network tab showing WebP format

### Activity 4: Forgot Password (7-8 ảnh)
1. Login page with "Forgot Password" link
2. Forgot password form
3. Success message "Email sent"
4. Gmail inbox with reset email
5. Email content with reset link
6. Reset password form
7. Password changed success
8. Login with new password

### Activity 5: Logging & Rate Limiting (8-10 ảnh)
1. Backend console with colored logs
2. combined.log file content
3. error.log file content
4. http.log file content (Morgan)
5. Login rate limit error (6th attempt)
6. Signup rate limit error
7. Forgot password rate limit error
8. Upload rate limit error
9. Rate limit headers in Postman (X-RateLimit-*)
10. Winston logger configuration code

---

## 🐛 Nếu Gặp Lỗi

### Backend không kết nối MongoDB
```bash
# Check MongoDB connection string trong .env
# Đảm bảo MongoDB Atlas whitelist IP của bạn
```

### Frontend không gọi được API
```bash
# Check backend đang chạy ở port 3000
# Check browser console có CORS errors không
```

### Avatar upload failed
```bash
# Cần có Cloudinary credentials trong .env
# Restart backend sau khi thêm credentials
```

### Email không gửi được
```bash
# Cần Gmail App Password (16 ký tự)
# Phải bật 2-Step Verification trước
# Restart backend sau khi thêm credentials
```

### Rate limit test không hoạt động
```bash
# Đợi hết thời gian block
# Hoặc restart backend để reset counters
```

---

## 📦 Nếu Cần Chạy Lại

### Stop Servers
```bash
# Backend terminal: Ctrl + C
# Frontend terminal: Ctrl + C
```

### Start Lại
```bash
# Terminal 1 - Backend
cd D:\Class\Class_Phat_Trien_Phan_Mem_Ma_Nguon_Mo\buoi4\group-17--project\backend
node server.js

# Terminal 2 - Frontend
cd D:\Class\Class_Phat_Trien_Phan_Mem_Ma_Nguon_Mo\buoi4\group-17--project\frontend
$env:PORT="3001"
npm start
```

---

## ✨ Tính Năng Đã Hoàn Thành

- ✅ Activity 1: Refresh Token (User tự làm)
- ✅ Activity 2: RBAC với 3 roles (Admin/Moderator/User)
- ✅ Activity 3: Avatar Upload với Cloudinary + Sharp
- ✅ Activity 4: Forgot Password với Email
- ✅ Activity 5: Winston Logging + Rate Limiting

**Tổng cộng:** 5/7 activities hoàn thành!

---

🎉 **Chúc mừng! Ứng dụng đã sẵn sàng để test và chụp ảnh báo cáo!**
