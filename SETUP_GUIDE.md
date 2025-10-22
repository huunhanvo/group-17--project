# 🚀 Hướng Dẫn Setup và Chạy Ứng Dụng

## 📋 Yêu Cầu Cài Đặt
- Node.js v14 trở lên
- MongoDB (local hoặc MongoDB Atlas)
- Git

## 🔧 Bước 1: Cài Đặt Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## ⚙️ Bước 2: Cấu Hình Environment Variables

### Backend (.env)
Mở file `backend/.env` và cập nhật các thông tin sau:

#### 2.1. MongoDB (Đã có sẵn)
```
MONGO_URI=mongodb+srv://group17project:XMMfszanH0D5uc2K@cluster0.kk7hc62.mongodb.net/groupDB?retryWrites=true&w=majority&appName=Cluster0
```
✅ Connection string đã được cấu hình

#### 2.2. JWT Secret (Đã có sẵn)
```
JWT_SECRET=group17_jwt_secret_key_2024_super_secure_string
```

#### 2.3. Server Port (ĐÃ ĐỔI từ 5000 → 3000)
```
PORT=3000
```
⚠️ **LƯU Ý**: Port đã đổi từ 5000 sang 3000 để phù hợp với các API endpoint mới

#### 2.4. Cloudinary (Cho Avatar Upload - Activity 3)
**Cách lấy Cloudinary credentials:**

1. Truy cập: https://cloudinary.com/
2. Đăng ký tài khoản miễn phí
3. Sau khi đăng nhập, vào **Dashboard**
4. Copy 3 thông tin sau:

```
CLOUDINARY_CLOUD_NAME=dxxxxxxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz
```

**Không có Cloudinary:** Tính năng upload avatar sẽ không hoạt động, nhưng các chức năng khác vẫn chạy bình thường.

#### 2.5. Email Configuration (Cho Forgot Password - Activity 4)
**Cách lấy Gmail App Password:**

1. Truy cập: https://myaccount.google.com/
2. Vào **Security** (Bảo mật)
3. Bật **2-Step Verification** (Xác minh 2 bước)
4. Sau khi bật, quay lại Security → tìm **App passwords**
5. Chọn app: **Mail**, device: **Windows Computer**
6. Copy mã 16 ký tự được tạo ra

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop  # 16 ký tự, bỏ khoảng trắng
FRONTEND_URL=http://localhost:3001
```

**Không có Email:** Tính năng Forgot Password sẽ không gửi email được, nhưng các chức năng khác vẫn hoạt động.

## 🏃 Bước 3: Chạy Ứng Dụng

### Cách 1: Chạy Từng Terminal (Khuyến nghị)

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```
✅ Backend chạy tại: http://localhost:3000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
✅ Frontend chạy tại: http://localhost:3001

### Cách 2: Chạy Backend ở Background (Windows)
```bash
# Terminal 1 - Backend
cd backend
start node server.js

# Terminal 2 - Frontend
cd frontend
npm start
```

## 🧪 Bước 4: Test Các Chức Năng

### ✅ Activity 1: Refresh Token (Đã có sẵn)
1. Đăng nhập với user bất kỳ
2. Token sẽ tự động refresh khi hết hạn

### ✅ Activity 2: RBAC - Role Based Access Control

**Test Admin:**
```
Email: admin@example.com
Password: admin123
```
- Truy cập **Admin Panel** → CRUD toàn bộ users
- Xem tất cả thông tin users
- Xóa/sửa/thêm users

**Test Moderator:**
```
Email: moderator@example.com
Password: mod123
```
- Truy cập **Moderator Panel** → Chỉ xem (read-only)
- Không thể xóa/sửa users

**Test User:**
```
Email: user1@example.com
Password: user123
```
- Chỉ xem được profile của chính mình
- Không có quyền truy cập Admin/Moderator Panel

**Postman Test (7 endpoints):**
1. GET /api/users - Lấy tất cả users (Admin only)
2. POST /api/users - Tạo user mới (Admin only)
3. PUT /api/users/:id - Cập nhật user (Admin hoặc chính user đó)
4. DELETE /api/users/:id - Xóa user (Admin only)
5. PUT /api/users/:id/role - Đổi role (Admin only)
6. GET /api/users/profile/me - Xem profile bản thân
7. GET /api/users/:id - Xem profile user khác (Admin/Moderator)

### ✅ Activity 3: Avatar Upload (Cloudinary)

**Test Upload Avatar:**
1. Đăng nhập với bất kỳ user nào
2. Vào **Profile** hoặc **Edit User**
3. Click **Choose File** → Chọn ảnh (JPG/PNG/GIF, max 5MB)
4. Click **Upload Avatar**
5. Ảnh sẽ được resize 500x500, convert sang WebP, upload lên Cloudinary

**Test Delete Avatar:**
1. Trong Profile, click **Delete Avatar**
2. Avatar sẏ bị xóa khỏi Cloudinary

**Rate Limit:** 10 uploads / 15 phút

### ✅ Activity 4: Forgot Password (Email)

**Test Forgot Password Flow:**
1. Ở trang Login, click **Forgot Password?**
2. Nhập email: `admin@example.com`
3. Click **Send Reset Link**
4. Check email (nếu đã cấu hình EMAIL_USER/PASSWORD)
5. Click link trong email hoặc copy token
6. Nhập password mới (ít nhất 6 ký tự)
7. Đăng nhập với password mới

**Rate Limit:** 3 requests / 1 giờ (chống spam)

**Postman Test:**
```bash
# 1. Forgot Password
POST http://localhost:3000/password/forgot
Body: { "email": "admin@example.com" }

# 2. Reset Password (lấy token từ email)
POST http://localhost:3000/password/reset/YOUR_TOKEN_HERE
Body: { "password": "newpassword123" }
```

### ✅ Activity 5: Logging & Rate Limiting

**Test Logging:**
1. Chạy backend → Check console logs (màu sắc)
2. Mở folder `backend/logs/`:
   - `combined.log` - Tất cả logs
   - `error.log` - Chỉ errors
   - `http.log` - HTTP requests (từ Morgan)
   - `exceptions.log` - Uncaught exceptions
   - `rejections.log` - Unhandled promise rejections

**Test Rate Limiting:**

| Endpoint | Limit | Time Window |
|----------|-------|-------------|
| GET /api/* | 100 requests | 15 phút |
| POST /auth/login | 5 requests | 15 phút (chỉ đếm failed) |
| POST /auth/signup | 3 accounts | 1 giờ |
| POST /password/forgot | 3 requests | 1 giờ |
| POST /avatar/upload | 10 uploads | 15 phút |

**Test vượt Rate Limit:**
```bash
# Gửi 6 lần login sai liên tiếp
# Lần thứ 6 sẽ bị chặn: "Too many login attempts"
```

## 📸 Bước 5: Chụp Screenshot cho Báo Cáo

### Activity 2: RBAC (17 screenshots)
**Postman (7 ảnh):**
1. GET /api/users (Admin)
2. POST /api/users (Admin)
3. PUT /api/users/:id (Admin)
4. DELETE /api/users/:id (Admin)
5. PUT /api/users/:id/role (Admin)
6. GET /api/users/profile/me
7. GET /api/users/:id (Moderator)

**Frontend (10 ảnh):**
1. Login as Admin
2. Admin Panel - User List
3. Admin Panel - Create User
4. Admin Panel - Edit User
5. Admin Panel - Delete User
6. Login as Moderator
7. Moderator Panel - View Only
8. Login as User
9. User Profile (own)
10. Access Denied (User trying to access Admin Panel)

### Activity 3: Avatar Upload (5-7 ảnh)
1. Profile trước khi upload
2. Chọn file ảnh
3. Upload thành công
4. Avatar hiển thị (đã resize)
5. Cloudinary Dashboard - ảnh đã upload
6. Delete avatar
7. Rate limit message (sau 10 uploads)

### Activity 4: Forgot Password (6-8 ảnh)
1. Click "Forgot Password" ở Login
2. Nhập email
3. Success message
4. Email nhận được (Gmail)
5. Click link trong email
6. Form Reset Password
7. Nhập password mới
8. Login thành công với password mới

### Activity 5: Logging & Rate Limiting (6-8 ảnh)
1. Backend console logs (màu sắc)
2. combined.log content
3. error.log content
4. http.log content (Morgan)
5. Rate limit violation (login)
6. Rate limit violation (signup)
7. Rate limit violation (forgot password)
8. Rate limit headers in Postman

## 🐛 Troubleshooting

### Lỗi: "Cannot connect to MongoDB"
```bash
# Kiểm tra MONGO_URI trong .env
# Đảm bảo MongoDB đang chạy (local) hoặc Atlas connection string đúng
```

### Lỗi: "Port 3000 already in use"
```bash
# Cách 1: Đổi port trong backend/.env
PORT=4000

# Cách 2: Kill process đang dùng port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Lỗi: "Cloudinary upload failed"
```bash
# Kiểm tra credentials trong .env
# Đảm bảo CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET đúng
```

### Lỗi: "Email not sent"
```bash
# Kiểm tra:
# 1. EMAIL_USER đúng format: your_email@gmail.com
# 2. EMAIL_PASSWORD là App Password (16 ký tự), không phải password thường
# 3. Đã bật 2-Step Verification trên Google Account
```

### Lỗi: Frontend không kết nối được Backend
```bash
# Kiểm tra:
# 1. Backend đang chạy ở port 3000
# 2. Frontend API calls đang dùng http://localhost:3000
# 3. Không có CORS errors trong console
```

## 📝 Seed Data Mặc Định

Sau khi chạy backend lần đầu, có thể chạy seed script:

```bash
cd backend
node seedUsers.js
```

**5 test users được tạo:**
1. **admin@example.com** / admin123 (Admin)
2. **moderator@example.com** / mod123 (Moderator)
3. **user1@example.com** / user123 (User)
4. **user2@example.com** / user123 (User)
5. **user3@example.com** / user123 (User)

## 🎯 Checklist Hoàn Thành

- [ ] Backend chạy thành công ở port 3000
- [ ] Frontend chạy thành công ở port 3001
- [ ] Đăng nhập thành công với các role khác nhau
- [ ] Admin có thể CRUD users
- [ ] Moderator chỉ xem được users
- [ ] User chỉ xem được profile của mình
- [ ] Upload avatar thành công (nếu có Cloudinary)
- [ ] Forgot password gửi email (nếu có Email config)
- [ ] Logs được ghi vào files
- [ ] Rate limiting hoạt động

## 🚀 Next Steps

1. ✅ Đã hoàn thành Activities 1-5
2. ⏳ Activity 6: Redux & Protected Routes (Optional)
3. ⏳ Activity 7: Socket.io Real-time (Optional)

---

**Liên hệ:** group-17-project
**Repository:** https://github.com/huunhanvo/group-17--project
