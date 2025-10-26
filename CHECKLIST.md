# ✅ CHECKLIST - KIỂM TRA HOÀN THÀNH

## 📋 SETUP & INSTALLATION

- [ ] Clone project từ GitHub
- [ ] `cd backend && npm install` (backend dependencies)
- [ ] `cd frontend && npm install` (frontend dependencies)
- [ ] Copy `.env.example` → `.env` và điền thông tin:
  - [ ] MONGO_URI (MongoDB Atlas)
  - [ ] JWT_SECRET
  - [ ] CLOUDINARY credentials
  - [ ] EMAIL_USER & EMAIL_PASSWORD (Gmail)

---

## 🗄️ DATABASE SETUP

- [ ] MongoDB Atlas account created
- [ ] Cluster created (FREE tier M0)
- [ ] Database user created
- [ ] Network Access: Allow 0.0.0.0/0
- [ ] Connection string copied và paste vào `.env`
- [ ] Chạy `npm run seed` tạo 5 users mẫu
- [ ] Verify: Vào MongoDB Atlas → Browse Collections → Thấy users

---

## ☁️ CLOUDINARY SETUP (CHO AVATAR UPLOAD)

- [ ] Cloudinary account created
- [ ] Copy Cloud name, API key, API secret
- [ ] Paste vào `.env`
- [ ] Test upload avatar trong frontend

---

## 📧 GMAIL SETUP (CHO FORGOT PASSWORD)

- [ ] Gmail account sẵn sàng
- [ ] Bật 2-Step Verification
- [ ] Tạo App Password (16 ký tự)
- [ ] Paste vào `.env` (EMAIL_USER & EMAIL_PASSWORD)
- [ ] Test forgot password → Check email received

---

## 🚀 RUN PROJECT

- [ ] Backend: `cd backend && npm start`
  - [ ] ✅ MongoDB Connected
  - [ ] ✅ Server running on port 3000
  - [ ] ✅ Socket.IO initialized

- [ ] Frontend: `cd frontend && npm start`
  - [ ] ✅ Browser mở http://localhost:3001
  - [ ] ✅ Login page hiển thị

---

## 🧪 FUNCTIONAL TESTING

### Authentication:
- [ ] Đăng nhập admin@example.com / admin123 → Success
- [ ] Logout → Quay về login page
- [ ] Đăng ký user mới → Success
- [ ] Login user mới → Success
- [ ] Check localStorage → Có accessToken và refreshToken

### CRUD Users:
- [ ] Dashboard: Thấy danh sách users
- [ ] Thêm user mới → User xuất hiện trong list
- [ ] Sửa user → Thông tin cập nhật
- [ ] Xóa user → User biến mất

### RBAC (Role-Based Access Control):
- [ ] Login admin → Thấy nút "👑 Admin Panel"
- [ ] Login moderator → Thấy nút "🛡️ Moderator Panel"
- [ ] Login user thường → Không thấy Admin/Moderator Panel
- [ ] Admin: Thay đổi role của user → Success
- [ ] User thường: Try access /api/users → 403 Forbidden

### Profile:
- [ ] Click nút "👤 Profile"
- [ ] Thấy thông tin cá nhân (name, email, role)
- [ ] Sửa name → Save → Name cập nhật
- [ ] Đổi password → Save → Login với password mới thành công

### Avatar Upload (Cloudinary):
- [ ] Click "Upload Avatar" trong Profile
- [ ] Chọn ảnh → Upload
- [ ] Ảnh hiển thị trong Profile
- [ ] Vào Cloudinary Media Library → Thấy ảnh trong folder `avatars/`

### Forgot/Reset Password:
- [ ] Click "Quên mật khẩu?"
- [ ] Nhập email user1@example.com
- [ ] Check email inbox → Nhận được email
- [ ] Click link reset trong email
- [ ] Nhập password mới → Reset thành công
- [ ] Login với password mới → Success

### Socket.IO Real-time:
- [ ] Mở 2 browsers (hoặc 2 tabs incognito)
- [ ] Login 2 users khác nhau
- [ ] Header hiển thị "👥 2 users online"
- [ ] Admin gửi broadcast message
- [ ] User thường nhận được notification real-time
- [ ] Check browser console → ✅ Socket.IO connected

### Refresh Token:
- [ ] Login → Copy accessToken
- [ ] Đợi 15 phút (hoặc set expiresIn="30s" để test nhanh)
- [ ] Call API protected route
- [ ] Check Network tab → Thấy `/api/auth/refresh`
- [ ] Request thành công với token mới

---

## 📡 API TESTING (POSTMAN/THUNDER CLIENT)

### Public Routes:
- [ ] POST /api/auth/signup → 201 Created
- [ ] POST /api/auth/login → 200 OK (có accessToken)
- [ ] POST /api/auth/forgot-password → 200 OK

### Protected Routes (Cần Authorization header):
- [ ] GET /api/users → 200 OK (admin/moderator only)
- [ ] GET /api/users/:id → 200 OK
- [ ] POST /api/users → 201 Created
- [ ] PUT /api/users/:id → 200 OK
- [ ] DELETE /api/users/:id → 200 OK (admin only)
- [ ] GET /api/auth/me → 200 OK (current user info)
- [ ] PUT /api/auth/profile → 200 OK

### Error Cases:
- [ ] POST /api/auth/login với password sai → 401 Unauthorized
- [ ] GET /api/users không có token → 401 Unauthorized
- [ ] User thường DELETE /api/users/:id → 403 Forbidden
- [ ] POST /api/users với email trùng → 400 Bad Request

---

## 📸 SCREENSHOTS (BUỔI 6 - 20+ ẢNH)

### MongoDB & Setup:
- [ ] MongoDB Atlas Dashboard
- [ ] Database Access (user created)
- [ ] Network Access (IP whitelist)
- [ ] Browse Collections (users data)

### Backend:
- [ ] Terminal: `npm start` success
- [ ] Terminal: `npm run seed` output
- [ ] Postman: POST /api/auth/login response
- [ ] Postman: GET /api/users với Authorization
- [ ] Postman: Error case (401/403)

### Frontend - Authentication:
- [ ] Login page
- [ ] Signup page
- [ ] Forgot password page
- [ ] Reset password page

### Frontend - Dashboard:
- [ ] Dashboard với user list
- [ ] Form thêm user
- [ ] Edit user modal
- [ ] Delete confirmation

### Frontend - Profile:
- [ ] Profile page
- [ ] Edit profile form
- [ ] Upload avatar dialog

### Frontend - RBAC:
- [ ] Admin Panel (full stats)
- [ ] Moderator Panel
- [ ] User dashboard (limited access)
- [ ] Access denied message (403)

### Frontend - Real-time:
- [ ] Header với "2 users online"
- [ ] Notification center (có notifications)
- [ ] Admin broadcast message toast
- [ ] Socket.IO connected log trong console

### Cloudinary:
- [ ] Cloudinary Dashboard
- [ ] Media Library (avatars folder)
- [ ] Uploaded image details

### Gmail:
- [ ] Gmail inbox với reset password email
- [ ] Email content (reset link)

---

## 🎥 VIDEO DEMO (3-5 PHÚT)

- [ ] Intro: Show MongoDB Atlas connected
- [ ] Backend: Terminal chạy, show logs
- [ ] Authentication: Signup → Login → Show token
- [ ] CRUD: Thêm/sửa/xóa users
- [ ] RBAC: Login admin vs user thường, so sánh quyền
- [ ] Profile: Edit info, change password
- [ ] Avatar: Upload → Show Cloudinary
- [ ] Forgot password: Request reset → Check email → Reset success
- [ ] Real-time: 2 users online, admin broadcast
- [ ] Refresh token: Show auto refresh trong Network tab
- [ ] Outro: Tóm tắt tính năng

---

## 📝 DOCUMENTATION

- [ ] README.md updated
- [ ] API documentation (Postman collection)
- [ ] Deployment guide (optional)
- [ ] User guide (how to use features)

---

## 🐛 ERROR CHECKING

- [ ] No console errors trong browser
- [ ] No errors trong backend terminal
- [ ] No MongoDB connection errors
- [ ] Cloudinary upload không lỗi
- [ ] Email gửi không lỗi
- [ ] Socket.IO connect không lỗi

---

## 🚀 DEPLOYMENT (OPTIONAL)

- [ ] Backend deployed (Railway/Render/Heroku)
- [ ] Frontend deployed (Vercel/Netlify)
- [ ] MongoDB Atlas production cluster
- [ ] Environment variables configured
- [ ] CORS updated cho production URLs

---

## 📊 CODE QUALITY

- [ ] Code formatted (Prettier/ESLint)
- [ ] No unused imports
- [ ] No console.logs trong production
- [ ] Comments rõ ràng
- [ ] Error handling đầy đủ

---

## 🎓 FINAL SUBMISSION

- [ ] GitHub repo public/private theo yêu cầu
- [ ] All commits pushed
- [ ] Branches merged về main
- [ ] Pull requests reviewed
- [ ] README.md đầy đủ hướng dẫn
- [ ] Screenshots uploaded (Google Drive/GitHub)
- [ ] Video demo uploaded (YouTube/Drive)
- [ ] Báo cáo PDF/Word (nếu yêu cầu)
- [ ] Link demo (nếu deployed)

---

## 🏆 TOTAL PROGRESS

**Hoàn thành:** _____ / 150+ items

**Phần trăm:** _____%

---

### 📌 PRIORITY

**HIGH (Phải có):**
- ✅ Setup & Run project
- ✅ Authentication working
- ✅ CRUD working
- ✅ RBAC working
- ✅ 20+ screenshots

**MEDIUM (Nên có):**
- ✅ Avatar upload
- ✅ Forgot password
- ✅ Socket.IO real-time
- ✅ Video demo

**LOW (Bonus):**
- ⚡ Deployment
- ⚡ Unit tests
- ⚡ API documentation (Swagger)
- ⚡ CI/CD

---

**🎯 BẮT ĐẦU CHECK NGAY!**

Print checklist này ra và tick từng item khi hoàn thành! ✅
