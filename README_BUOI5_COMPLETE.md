# 📚 BUỔI 5 - ỨNG DỤNG HOÀN CHỈNH CƠ BẢN
## Authentication & User Management System

---

## 🎯 Tổng quan dự án

**Tech Stack:**
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: React.js (Create React App)
- **Authentication**: JWT (JSON Web Token), bcryptjs
- **Database**: MongoDB Atlas

**Port Configuration:**
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

---

## ✅ HOẠT ĐỘNG 1: Authentication cơ bản

### Đã implement:
1. **Backend APIs:**
   - ✅ POST `/auth/signup` - Đăng ký tài khoản mới
   - ✅ POST `/auth/login` - Đăng nhập
   - ✅ POST `/auth/logout` - Đăng xuất
   - ✅ GET `/auth/me` - Lấy thông tin user hiện tại (protected)

2. **Frontend Components:**
   - ✅ `SignUp.jsx` - Form đăng ký với validation
   - ✅ `Login.jsx` - Form đăng nhập với JWT token storage
   - ✅ `App.js` - Routing & authentication state management

3. **Features:**
   - ✅ JWT token generation & validation
   - ✅ Password hashing với bcrypt
   - ✅ LocalStorage để lưu token & user data
   - ✅ Auto redirect sau login/signup thành công

### Screenshot yêu cầu (3 ảnh):
1. Form đăng ký + thông báo đăng ký thành công
2. Form đăng nhập + redirect vào Dashboard
3. Postman test API: `/auth/signup`, `/auth/login`, `/auth/me`

📖 **Chi tiết**: Xem file `README_Activity1.md`

---

## ✅ HOẠT ĐỘNG 2: Profile Management

### Đã implement:
1. **Backend APIs:**
   - ✅ PUT `/auth/profile` - Cập nhật thông tin cá nhân (protected)
     - Cập nhật tên, email
     - Đổi mật khẩu (với xác nhận mật khẩu cũ)

2. **Frontend Components:**
   - ✅ `Profile.jsx` - Giao diện quản lý profile
     - **View Mode**: Hiển thị thông tin user
     - **Edit Mode**: Form chỉnh sửa thông tin + đổi mật khẩu

3. **Features:**
   - ✅ Toggle giữa View/Edit mode
   - ✅ Validation: email format, password length >= 6
   - ✅ Change password với confirm password
   - ✅ Realtime update localStorage sau khi edit

### Screenshot yêu cầu (3 ảnh):
1. Giao diện Profile - View Mode (hiển thị thông tin)
2. Giao diện Profile - Edit Mode (form chỉnh sửa)
3. Postman test API: PUT `/auth/profile` (update name/email/password)

📖 **Chi tiết**: Xem file `README_Activity2.md`

---

## ✅ HOẠT ĐỘNG 3: Admin Panel & RBAC

### Đã implement:
1. **Backend:**
   - ✅ Middleware `authMiddleware.js`:
     - `protect` - Verify JWT token
     - `adminOnly` - Check admin role
   - ✅ APIs:
     - GET `/user/all` - Lấy danh sách tất cả users (admin only)
     - DELETE `/user/:id` - Xóa user (admin only)

2. **Frontend Components:**
   - ✅ `AdminPanel.jsx` - Quản lý users
     - Hiển thị danh sách users (name, email, role, createdAt)
     - Nút xóa user với confirm dialog
     - Chỉ admin mới thấy nút "👑 Admin" trong header

3. **Features:**
   - ✅ Role-Based Access Control (RBAC)
   - ✅ Protected routes với middleware
   - ✅ Admin-only UI components
   - ✅ Confirmation trước khi xóa user

### Screenshot yêu cầu (4 ảnh):
1. Giao diện Admin Panel - danh sách users
2. Confirm dialog trước khi xóa user
3. Postman test: GET `/user/all` (admin token)
4. Postman test: DELETE `/user/:id` (admin token)

📖 **Chi tiết**: Xem file `README_Activity3.md`

---

## ✅ HOẠT ĐỘNG 4: Advanced Features

### Đã implement:
1. **Backend APIs:**
   - ✅ POST `/auth/forgot-password` - Tạo token reset password
     - Generate crypto random token
     - Hash token với SHA256
     - Token expiry: 30 phút
     - Demo mode: Return token (production: send via email)
   
   - ✅ POST `/auth/reset-password/:resetToken` - Reset password
     - Validate token & expiry
     - Update password mới
     - Clear token sau khi reset thành công
   
   - ✅ POST `/auth/upload-avatar` - Upload avatar (protected)
     - Accept base64 string hoặc URL
     - Update user.avatar field

2. **Frontend Components:**
   - ✅ `ForgotPassword.jsx` - Form quên mật khẩu
     - Input email
     - Display reset token (demo mode)
     - Copy token button
   
   - ✅ `ResetPassword.jsx` - Form reset password
     - Input reset token
     - New password + confirm password
     - Validation & auto redirect to login
   
   - ✅ `Profile.jsx` (Enhanced) - Thêm upload avatar
     - Avatar display (view mode)
     - File upload với preview (edit mode)
     - Validation: max 5MB, image formats
     - Realtime update sau upload

3. **App.js Routing:**
   - ✅ Added views: `forgot-password`, `reset-password`
   - ✅ Link "🔑 Quên mật khẩu?" trong Login page
   - ✅ Navigation giữa forgot/reset/login

### Screenshot yêu cầu (10 ảnh):

**Frontend (6 ảnh):**
1. Form Forgot Password + Token hiển thị
2. Form Reset Password với token + thông báo thành công
3. Đăng nhập thành công với mật khẩu mới
4. Profile Edit Mode - Avatar preview trước upload
5. Thông báo upload avatar thành công
6. Avatar hiển thị trong View Mode

**Postman (4 ảnh):**
7. POST `/auth/forgot-password` (200 OK, có resetToken)
8. POST `/auth/reset-password/:token` (200 OK)
9. POST `/auth/upload-avatar` (200 OK, với Authorization)
10. GET `/auth/me` (verify avatar field)

📖 **Chi tiết**: Xem file `README_Activity4.md`

---

## 🗂️ Cấu trúc Project

```
group-17--project/
├── backend/
│   ├── server.js                 # Entry point
│   ├── package.json
│   ├── .env                      # MONGO_URI, PORT=5000
│   ├── models/
│   │   └── User.js              # User schema với auth fields
│   ├── controllers/
│   │   ├── authController.js    # Auth logic (signup, login, profile, forgot/reset, avatar)
│   │   └── userController.js    # User management (admin)
│   ├── middleware/
│   │   └── authMiddleware.js    # protect, adminOnly
│   └── routes/
│       ├── auth.js              # Auth routes
│       └── user.js              # User routes (admin)
│
├── frontend/
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── App.js               # Main routing & state management
│   │   ├── App.css
│   │   ├── index.js
│   │   └── components/
│   │       ├── SignUp.jsx       # Đăng ký
│   │       ├── Login.jsx        # Đăng nhập
│   │       ├── Profile.jsx      # Profile management + avatar
│   │       ├── AdminPanel.jsx   # Admin user management
│   │       ├── ForgotPassword.jsx   # Quên mật khẩu
│   │       ├── ResetPassword.jsx    # Reset password
│   │       ├── AddUser.jsx      # (Dashboard) Add user
│   │       └── UserList.jsx     # (Dashboard) List users
│
├── README.md
├── README_Activity1.md          # Chi tiết Hoạt động 1
├── README_Activity2.md          # Chi tiết Hoạt động 2
├── README_Activity3.md          # Chi tiết Hoạt động 3
├── README_Activity4.md          # Chi tiết Hoạt động 4
└── README_BUOI5_COMPLETE.md     # File này - Tổng kết
```

---

## 🚀 Hướng dẫn chạy Project

### 1. Clone & Setup

```bash
# Clone repository
git clone <your-repo-url>
cd group-17--project
```

### 2. Backend Setup

```bash
cd backend
npm install

# Tạo file .env
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>
# PORT=5000

# Chạy backend
node server.js
```

✅ Backend running at: http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install

# Chạy frontend
npm start
```

✅ Frontend running at: http://localhost:3000

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String,              // required
  email: String,             // required, unique
  password: String,          // required, hashed, select: false
  role: String,              // enum: ['user', 'admin'], default: 'user'
  avatar: String,            // base64 or URL
  resetPasswordToken: String,    // hashed token, select: false
  resetPasswordExpire: Date,     // 30 phút expiry
  createdAt: Date,          // auto timestamp
  updatedAt: Date           // auto timestamp
}
```

### Methods:
- `comparePassword(enteredPassword)` - So sánh password với bcrypt
- `getResetPasswordToken()` - Generate & hash reset token

---

## 🔐 API Endpoints Summary

### Public Routes (không cần token):
```
POST   /auth/signup              # Đăng ký
POST   /auth/login               # Đăng nhập
POST   /auth/logout              # Đăng xuất
POST   /auth/forgot-password     # Quên mật khẩu
POST   /auth/reset-password/:token  # Reset password
```

### Protected Routes (cần Bearer token):
```
GET    /auth/me                  # Lấy thông tin user
PUT    /auth/profile             # Cập nhật profile
POST   /auth/upload-avatar       # Upload avatar
```

### Admin Only Routes (cần token + role admin):
```
GET    /user/all                 # Danh sách tất cả users
DELETE /user/:id                 # Xóa user
```

---

## 🎨 Frontend Views

### Public Views:
- **Login** (`currentView = 'login'`) - Trang đăng nhập
- **SignUp** (`currentView = 'signup'`) - Trang đăng ký
- **Forgot Password** (`currentView = 'forgot-password'`) - Quên mật khẩu
- **Reset Password** (`currentView = 'reset-password'`) - Reset password

### Protected Views (cần login):
- **Dashboard** (`currentView = 'dashboard'`) - Trang chính với AddUser & UserList
- **Profile** (`currentView = 'profile'`) - Quản lý thông tin cá nhân
- **Admin Panel** (`currentView = 'admin'`) - Quản lý users (admin only)

---

## 🧪 Testing Checklist

### Hoạt động 1 - Authentication:
- [ ] Đăng ký tài khoản mới thành công
- [ ] Đăng nhập với tài khoản đã tạo
- [ ] Token lưu vào localStorage
- [ ] Đăng xuất xóa token & redirect về login

### Hoạt động 2 - Profile:
- [ ] Xem thông tin profile
- [ ] Cập nhật tên, email thành công
- [ ] Đổi mật khẩu thành công
- [ ] Validation form hoạt động

### Hoạt động 3 - Admin:
- [ ] Chỉ admin thấy nút Admin Panel
- [ ] Danh sách users hiển thị đầy đủ
- [ ] Xóa user thành công (với confirm)
- [ ] User thường không access được admin routes

### Hoạt động 4 - Advanced:
- [ ] Forgot password tạo token thành công
- [ ] Reset password với token hợp lệ
- [ ] Upload avatar hiển thị preview
- [ ] Avatar update thành công và hiển thị

---

## 🎓 Kết luận

**Đã hoàn thành đầy đủ 4 Hoạt động Buổi 5:**

✅ **Hoạt động 1**: Authentication cơ bản (Signup, Login, Logout, JWT)
✅ **Hoạt động 2**: Profile Management (View, Edit, Change Password)
✅ **Hoạt động 3**: Admin Panel & RBAC (User Management, Roles)
✅ **Hoạt động 4**: Advanced Features (Forgot/Reset Password, Upload Avatar)

**Tổng số API endpoints**: 11
**Tổng số Frontend components**: 8
**Tổng số Screenshot yêu cầu**: 20 (3 + 3 + 4 + 10)

---

## 🚀 Next Steps (Production Ready)

### Security Enhancements:
- [ ] Environment variables cho JWT_SECRET
- [ ] Rate limiting cho login/forgot-password
- [ ] HTTPS trong production
- [ ] Input sanitization để chống XSS

### Email Service:
- [ ] Setup NodeMailer với SMTP
- [ ] Email templates cho forgot password
- [ ] Email verification sau signup

### File Storage:
- [ ] Integrate Cloudinary cho avatar storage
- [ ] Image optimization & resize
- [ ] CDN delivery

### Additional Features:
- [ ] Remember me functionality
- [ ] Two-factor authentication (2FA)
- [ ] Activity logs
- [ ] User permissions management

---

**🎉 Chúc mừng bạn đã hoàn thành Buổi 5!**

Tạo bởi: **Group 17**
Môn: **Phát triển phần mềm mã nguồn mở**
Buổi: **5 - Authentication & User Management**
