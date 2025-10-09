# 📚 Hoạt động 4: Tính năng nâng cao (Forgot/Reset Password & Upload Avatar)

## 🎯 Mục tiêu
- Implement chức năng quên mật khẩu & reset password với token
- Implement chức năng upload avatar (base64)
- Test tất cả API với Postman
- Chụp screenshot các tính năng

---

## 📝 Các tính năng đã implement

### 1. Backend APIs

#### ✅ POST /auth/forgot-password
- **Chức năng**: Tạo token reset password và trả về (demo mode - thực tế gửi qua email)
- **Body**: 
```json
{
  "email": "user@example.com"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Token reset đã được tạo (demo mode)",
  "resetToken": "abc123xyz..."
}
```

#### ✅ POST /auth/reset-password/:resetToken
- **Chức năng**: Đổi mật khẩu mới sử dụng token reset
- **URL Params**: `resetToken` - Token nhận được từ forgot-password
- **Body**:
```json
{
  "newPassword": "newpassword123"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Đổi mật khẩu thành công!"
}
```

#### ✅ POST /auth/upload-avatar
- **Chức năng**: Upload avatar (base64 hoặc URL)
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Upload avatar thành công!",
  "user": {
    "name": "...",
    "email": "...",
    "avatar": "data:image/jpeg;base64,..."
  }
}
```

### 2. Frontend Components

#### ✅ ForgotPassword.jsx
- Form nhập email
- Gọi API `/auth/forgot-password`
- Hiển thị token reset (demo mode)
- Copy token để dùng trong ResetPassword

#### ✅ ResetPassword.jsx
- Form nhập token reset + mật khẩu mới
- Validation: mật khẩu >= 6 ký tự, confirm password khớp
- Gọi API `/auth/reset-password/:token`
- Auto redirect về login sau 2 giây khi thành công

#### ✅ Profile.jsx (cập nhật)
- **View Mode**: Hiển thị avatar (nếu có), thông tin user
- **Edit Mode**: 
  - Upload avatar với preview
  - Chọn file ảnh (max 5MB)
  - Upload và cập nhật realtime
  - Chỉnh sửa tên, email, đổi mật khẩu

#### ✅ App.js (routing)
- Thêm views: `forgot-password`, `reset-password`
- Link "Quên mật khẩu?" trong trang Login
- Navigation giữa các trang forgot/reset/login

---

## 🧪 HƯỚNG DẪN TEST & CHỤP SCREENSHOT

### Bước 1: Khởi động server

1. **Start Backend** (Terminal 1):
```cmd
cd backend
node server.js
```
✅ Backend chạy tại: http://localhost:5000

2. **Start Frontend** (Terminal 2):
```cmd
cd frontend
npm start
```
✅ Frontend chạy tại: http://localhost:3000

---

### Bước 2: Test Frontend - Forgot Password

#### Screenshot 1: Form Forgot Password
1. Mở trình duyệt: http://localhost:3000
2. Click vào "🔑 Quên mật khẩu?"
3. Nhập email: `vannhan@gmail.com`
4. Click "Gửi yêu cầu reset"
5. **Chụp màn hình**: Form + Token hiển thị
   - ✅ Form input email
   - ✅ Token reset hiển thị ra
   - ✅ Nút copy token

---

### Bước 3: Test Frontend - Reset Password

#### Screenshot 2: Form Reset Password với Token
1. Copy token từ màn hình trước
2. Click "Đã có token reset →"
3. Paste token vào textarea
4. Nhập mật khẩu mới: `newpass123`
5. Nhập confirm password: `newpass123`
6. Click "Đổi mật khẩu"
7. **Chụp màn hình**: 
   - ✅ Form với token đã paste
   - ✅ Trường mật khẩu mới
   - ✅ Thông báo "Đổi mật khẩu thành công!"

#### Screenshot 3: Đăng nhập lại với mật khẩu mới
1. Sau khi reset thành công, tự động redirect về login
2. Đăng nhập với:
   - Email: `vannhan@gmail.com`
   - Password: `newpass123` (mật khẩu mới)
3. **Chụp màn hình**: Dashboard sau khi login thành công

---

### Bước 4: Test Frontend - Upload Avatar

#### Screenshot 4: Profile - Upload Avatar
1. Click nút "👤 Profile"
2. Click "✏️ Chỉnh sửa thông tin"
3. Trong phần "📸 Upload Avatar":
   - Click "Choose File" và chọn 1 ảnh
   - Preview ảnh hiển thị
4. **Chụp màn hình**: Avatar preview trước khi upload

#### Screenshot 5: Avatar Upload thành công
1. Click "⬆️ Upload Avatar"
2. Đợi upload xong
3. **Chụp màn hình**: 
   - ✅ Thông báo "Upload avatar thành công!"
   - ✅ Avatar mới hiển thị trong profile

#### Screenshot 6: Avatar hiển thị ở View Mode
1. Scroll xuống, click "💾 Lưu thay đổi" hoặc click "🚫 Hủy"
2. Quay về View Mode
3. **Chụp màn hình**: Avatar hiển thị tròn ở đầu trang Profile

---

### Bước 5: Test API với Postman

#### Screenshot 7: Test POST /auth/forgot-password

**Request:**
- Method: `POST`
- URL: `http://localhost:5000/auth/forgot-password`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "email": "huunhan@gmail.com"
}
```

**Chụp màn hình:**
- ✅ Request setup (URL, Method, Body)
- ✅ Response body với `resetToken`
- ✅ Status: 200 OK

---

#### Screenshot 8: Test POST /auth/reset-password/:resetToken

**Request:**
- Method: `POST`
- URL: `http://localhost:5000/auth/reset-password/<TOKEN_TỪ_BƯỚC_TRƯỚC>`
  - Ví dụ: `http://localhost:5000/auth/reset-password/abc123xyz...`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "newPassword": "newpassword123"
}
```

**Chụp màn hình:**
- ✅ URL với token
- ✅ Request body
- ✅ Response: "Đổi mật khẩu thành công!"
- ✅ Status: 200 OK

---

#### Screenshot 9: Test POST /auth/upload-avatar

**Bước chuẩn bị:**
1. Đăng nhập để lấy token:
   - POST `http://localhost:5000/auth/login`
   - Body: `{"email": "huunhan@gmail.com", "password": "newpassword123"}`
   - Copy `token` từ response

2. Chuyển ảnh sang base64:
   - Dùng tool online: https://www.base64-image.de/
   - Upload ảnh → Copy base64 string (có prefix `data:image/jpeg;base64,...`)

**Request:**
- Method: `POST`
- URL: `http://localhost:5000/auth/upload-avatar`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer <TOKEN_TỪ_LOGIN>`
- Body (raw JSON):
```json
{
  "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Chụp màn hình:**
- ✅ Headers với Authorization Bearer token
- ✅ Request body với avatar base64
- ✅ Response: user object với avatar field
- ✅ Status: 200 OK

---

#### Screenshot 10: Verify avatar trong GET /auth/me

**Request:**
- Method: `GET`
- URL: `http://localhost:5000/auth/me`
- Headers:
  - `Authorization: Bearer <TOKEN>`

**Chụp màn hình:**
- ✅ Response body có field `avatar` với base64 string
- ✅ Status: 200 OK

---

## 📋 Checklist Screenshot (10 ảnh)

### Frontend (6 ảnh):
- [ ] **Screenshot 1**: Form Forgot Password + Token hiển thị
- [ ] **Screenshot 2**: Form Reset Password với token + thông báo thành công
- [ ] **Screenshot 3**: Đăng nhập thành công với mật khẩu mới
- [ ] **Screenshot 4**: Profile Edit Mode - Avatar preview trước upload
- [ ] **Screenshot 5**: Thông báo upload avatar thành công
- [ ] **Screenshot 6**: Avatar hiển thị trong View Mode

### Postman API (4 ảnh):
- [ ] **Screenshot 7**: POST /auth/forgot-password (200 OK, có resetToken)
- [ ] **Screenshot 8**: POST /auth/reset-password/:token (200 OK, đổi password thành công)
- [ ] **Screenshot 9**: POST /auth/upload-avatar (200 OK, với Authorization header)
- [ ] **Screenshot 10**: GET /auth/me (verify avatar field có base64)

---

## 🔍 Lưu ý quan trọng

### Reset Password Token:
- Token có thời hạn 30 phút (1800000 ms)
- Sau khi reset thành công, token tự động bị xóa
- Nếu token hết hạn → Error: "Token không hợp lệ hoặc đã hết hạn"

### Avatar Upload:
- Max size: 5MB
- Format: JPG, PNG, GIF
- Lưu dạng base64 trong database (demo - production nên dùng Cloudinary)

### Security:
- Upload avatar cần authentication (Bearer token)
- Reset password không cần authentication (dùng token reset)
- Forgot password chỉ cần email hợp lệ

---

## 🎓 Kết luận Hoạt động 4

✅ **Đã hoàn thành:**
1. Backend: Forgot Password API với token generation (crypto + SHA256)
2. Backend: Reset Password API với token validation & expiry
3. Backend: Upload Avatar API với base64 storage
4. Frontend: ForgotPassword component với token display
5. Frontend: ResetPassword component với validation
6. Frontend: Profile component với avatar upload & preview
7. App.js routing: Integrated forgot/reset password flow

📸 **Yêu cầu screenshot:** 10 ảnh (6 frontend + 4 Postman)

🚀 **Ready for production với:**
- Email service (NodeMailer) để gửi token
- Cloud storage (Cloudinary) để lưu avatar
- Rate limiting để chống spam forgot-password

---

**Chúc bạn test thành công! 🎉**
