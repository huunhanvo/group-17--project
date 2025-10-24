# 📮 Hướng Dẫn Sử Dụng Postman Collection

## 🎯 Mục Đích
Postman Collection này chứa tất cả API endpoints để test Activities 1-5, bao gồm:
- ✅ Authentication (Login, Signup, Refresh Token)
- ✅ RBAC - Role-Based Access Control
- ✅ Avatar Upload với Cloudinary
- ✅ Forgot Password với Email
- ✅ Rate Limiting Tests

---

## 📥 Bước 1: Cài Đặt Postman

### 1.1. Download Postman
**Cách 1: Desktop App** (Khuyến nghị)
- Truy cập: https://www.postman.com/downloads/
- Download phiên bản Windows
- Cài đặt và mở ứng dụng

**Cách 2: VS Code Extension**
- Mở VS Code
- Vào Extensions (Ctrl + Shift + X)
- Tìm "Thunder Client" hoặc "REST Client"
- Install extension

**Cách 3: Web Version**
- Truy cập: https://web.postman.co/
- Đăng nhập hoặc tạo tài khoản miễn phí

---

## 📂 Bước 2: Import Collection

### 2.1. Mở Postman
- Launch Postman Desktop App
- Hoặc truy cập https://web.postman.co/

### 2.2. Import Collection File

**Cách 1: Import từ File** (Khuyến nghị)
1. Click **"Import"** ở góc trên bên trái
2. Click **"Upload Files"**
3. Browse đến file:
   ```
   D:\Class\Class_Phat_Trien_Phan_Mem_Ma_Nguon_Mo\buoi4\group-17--project\docs\Postman_Collection.json
   ```
4. Click **"Open"**
5. Click **"Import"**

**Cách 2: Copy-Paste JSON**
1. Mở file `Postman_Collection.json` bằng text editor
2. Copy toàn bộ nội dung
3. Trong Postman, click **"Import"**
4. Chọn tab **"Raw text"**
5. Paste JSON vào
6. Click **"Continue"** → **"Import"**

### 2.3. Xác Nhận Import Thành Công
Sau khi import, bạn sẽ thấy collection mới:
```
📁 Group 17 - User Management API
  ├─ 1. Authentication
  ├─ 2. Users - RBAC (Activity 2)
  ├─ 3. Avatar Upload (Activity 3)
  ├─ 4. Password Reset (Activity 4)
  └─ 5. Rate Limiting Tests (Activity 5)
```

---

## ⚙️ Bước 3: Cấu Hình Variables

### 3.1. Mở Collection Variables
1. Click vào collection **"Group 17 - User Management API"**
2. Click tab **"Variables"**
3. Xem các biến có sẵn:

### 3.2. Cập Nhật Base URL (Nếu cần)
```
VARIABLE       | INITIAL VALUE           | CURRENT VALUE
baseUrl        | http://localhost:3000   | http://localhost:3000
adminToken     | (empty)                 | (auto-filled after login)
moderatorToken | (empty)                 | (auto-filled after login)
userToken      | (empty)                 | (auto-filled after login)
userId         | (empty)                 | (auto-filled after create)
```

**Lưu ý:**
- `baseUrl`: Giữ nguyên `http://localhost:3000` (port của backend)
- Các token sẽ tự động được set sau khi login
- `userId` sẽ tự động được set sau khi create user

### 3.3. Save Variables
Click **"Save"** (Ctrl + S)

---

## 🚀 Bước 4: Test Từng Activity

### ✅ Activity 1: Authentication & Refresh Token

#### 4.1. Test Signup
1. Mở **"1. Authentication"** → **"Signup"**
2. Xem Body:
   ```json
   {
     "name": "Test User",
     "email": "testuser@example.com",
     "password": "test123456"
   }
   ```
3. Đổi email nếu đã tồn tại
4. Click **"Send"**
5. **Expected Response (201):**
   ```json
   {
     "success": true,
     "message": "User registered successfully",
     "token": "eyJhbGciOiJIUzI1...",
     "user": {
       "_id": "...",
       "name": "Test User",
       "email": "testuser@example.com",
       "role": "user"
     }
   }
   ```

#### 4.2. Test Login - Admin
1. Mở **"Login - Admin"**
2. Click **"Send"**
3. Token sẽ tự động lưu vào `adminToken` variable
4. **Expected Response (200):**
   ```json
   {
     "success": true,
     "token": "eyJhbGciOiJIUzI1...",
     "user": {
       "role": "admin",
       "name": "Admin User"
     }
   }
   ```

#### 4.3. Test Login - Moderator & User
- Tương tự, test **"Login - Moderator"** và **"Login - User"**
- Token sẽ tự động lưu vào các biến tương ứng

#### 4.4. Test Refresh Token
1. Sau khi login, copy refresh token từ cookie/response
2. Mở **"Refresh Token"**
3. Paste vào body
4. Click **"Send"**

---

### ✅ Activity 2: RBAC - Role-Based Access Control

#### 4.5. Test Get All Users (Admin Only)
1. Mở **"2. Users - RBAC"** → **"Get All Users (Admin)"**
2. Check Authorization tab: Bearer token = `{{adminToken}}`
3. Click **"Send"**
4. **Expected Response (200):**
   ```json
   {
     "success": true,
     "count": 5,
     "users": [...]
   }
   ```

#### 4.6. Test Create User (Admin Only)
1. Mở **"Create User (Admin)"**
2. Xem Body, đổi email nếu cần
3. Click **"Send"**
4. `userId` sẽ tự động lưu vào variable
5. **Expected Response (201):**
   ```json
   {
     "success": true,
     "user": {
       "_id": "...",
       "name": "New User",
       "role": "user"
     }
   }
   ```

#### 4.7. Test Update User
1. Mở **"Update User (Admin/Self)"**
2. URL dùng `{{userId}}` (auto-filled)
3. Edit body theo ý muốn
4. Click **"Send"**

#### 4.8. Test Change Role (Admin Only)
1. Mở **"Change User Role (Admin)"**
2. Body:
   ```json
   {
     "role": "moderator"
   }
   ```
3. Click **"Send"**
4. **Expected Response (200):**
   ```json
   {
     "success": true,
     "message": "Role updated successfully"
   }
   ```

#### 4.9. Test Delete User (Admin Only)
1. Mở **"Delete User (Admin)"**
2. Click **"Send"**
3. **Expected Response (200):**
   ```json
   {
     "success": true,
     "message": "User deleted successfully"
   }
   ```

#### 4.10. Test Access Control
**Test với Moderator Token:**
1. Đổi token sang `{{moderatorToken}}`
2. Thử **"Get All Users"** → ✅ Success (can view)
3. Thử **"Delete User"** → ❌ 403 Forbidden (cannot delete)

**Test với User Token:**
1. Đổi token sang `{{userToken}}`
2. Thử **"Get All Users"** → ❌ 403 Forbidden
3. Thử **"Get My Profile"** → ✅ Success (own profile)

---

### ✅ Activity 3: Avatar Upload

#### 4.11. Test Upload Avatar
1. Mở **"3. Avatar Upload"** → **"Upload Avatar"**
2. Authorization: Bearer `{{adminToken}}`
3. Body → **form-data**
4. Key: `avatar`, Type: **File**
5. Click **"Select File"** → Chọn ảnh (JPG/PNG/GIF)
6. Click **"Send"**
7. **Expected Response (200):**
   ```json
   {
     "success": true,
     "message": "Avatar uploaded successfully",
     "avatar": "https://res.cloudinary.com/..."
   }
   ```

**⚠️ Lưu ý:**
- Cần cấu hình Cloudinary credentials trong `.env` trước
- Rate limit: 10 uploads / 15 phút

#### 4.12. Test Delete Avatar
1. Mở **"Delete Avatar"**
2. Click **"Send"**
3. **Expected Response (200):**
   ```json
   {
     "success": true,
     "message": "Avatar deleted successfully"
   }
   ```

---

### ✅ Activity 4: Forgot Password

#### 4.13. Test Forgot Password
1. Mở **"4. Password Reset"** → **"Forgot Password"**
2. Body:
   ```json
   {
     "email": "admin@example.com"
   }
   ```
3. Click **"Send"**
4. **Expected Response (200):**
   ```json
   {
     "success": true,
     "message": "Reset password email sent successfully"
   }
   ```
5. Check email của bạn để lấy reset token

**⚠️ Lưu ý:**
- Cần cấu hình Gmail App Password trong `.env` trước
- Rate limit: 3 requests / 1 giờ

#### 4.14. Test Reset Password
1. Copy token từ email
2. Mở **"Reset Password"**
3. Sửa URL: Thay `YOUR_RESET_TOKEN_HERE` bằng token thực
4. Body:
   ```json
   {
     "password": "newpassword123"
   }
   ```
5. Click **"Send"**
6. **Expected Response (200):**
   ```json
   {
     "success": true,
     "message": "Password reset successful"
   }
   ```

---

### ✅ Activity 5: Rate Limiting & Logging

#### 4.15. Test Login Rate Limit
1. Mở **"5. Rate Limiting Tests"** → **"Test Login Rate Limit"**
2. Body có password SAI: `"wrongpassword"`
3. Click **"Send"** 6 lần liên tiếp
4. **Lần thứ 6 Expected Response (429):**
   ```json
   {
     "success": false,
     "message": "Too many login attempts, please try again after 15 minutes"
   }
   ```

#### 4.16. Check Rate Limit Headers
Trong Response Headers, xem:
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1234567890
Retry-After: 900
```

#### 4.17. Check Logs
1. Mở `backend/logs/combined.log`
2. Xem logs của các requests
3. Mở `backend/logs/error.log` để xem rate limit violations

---

## 📸 Screenshots Cần Chụp

### Activity 2: RBAC (7 ảnh Postman)
1. **GET /api/users** - Admin token, response 200 với user list
2. **POST /api/users** - Create user, response 201
3. **PUT /api/users/:id** - Update user, response 200
4. **DELETE /api/users/:id** - Delete user, response 200
5. **PUT /api/users/:id/role** - Change role, response 200
6. **GET /api/users/profile/me** - Own profile, response 200
7. **GET /api/users/:id** - Moderator viewing user, response 200

### Activity 3: Avatar Upload (2-3 ảnh)
1. **POST /avatar/upload** - Form-data với file, response 200
2. **Response body** - Showing Cloudinary URL
3. **Rate limit** - After 11th upload, response 429

### Activity 4: Password Reset (2 ảnh)
1. **POST /password/forgot** - Response 200, email sent
2. **POST /password/reset/:token** - Response 200, password reset

### Activity 5: Rate Limiting (3-4 ảnh)
1. **Login rate limit** - 6th attempt, response 429
2. **Rate limit headers** - X-RateLimit-* headers
3. **Combined.log** - Showing logged requests
4. **Error.log** - Showing rate limit violations

---

## 🐛 Troubleshooting

### Lỗi: "Could not send request"
```
Nguyên nhân: Backend không chạy
Giải pháp:
1. Check backend đang chạy: http://localhost:3000
2. Terminal có lỗi gì không
3. Restart backend
```

### Lỗi: 401 Unauthorized
```
Nguyên nhân: Token không hợp lệ hoặc hết hạn
Giải pháp:
1. Login lại để lấy token mới
2. Check Authorization tab có token đúng không
3. Token có đúng format "Bearer {{tokenName}}" không
```

### Lỗi: 403 Forbidden
```
Nguyên nhân: Không đủ quyền truy cập
Giải pháp:
1. Check role của user đang dùng token
2. Đổi sang admin token cho endpoints yêu cầu admin
3. Xem lại RBAC middleware rules
```

### Token không tự động lưu
```
Nguyên nhân: Script trong Tests tab không chạy
Giải pháp:
1. Vào tab "Tests" của request
2. Check code có đúng không
3. Hoặc copy token thủ công vào Variables
```

---

## 💡 Tips

### Save All Responses
1. Click vào request
2. Click **"Save Response"**
3. Folder: `responses/`
4. Dùng cho báo cáo

### Export Collection
1. Right-click collection
2. **"Export"**
3. Format: Collection v2.1
4. Lưu file để backup

### Run Collection
1. Click **"..."** bên collection
2. **"Run collection"**
3. Chọn requests muốn chạy
4. Click **"Run"**
5. Xem tổng hợp kết quả

### Environment Variables
Nếu muốn dùng nhiều môi trường (dev, prod):
1. Click **"Environments"**
2. **"Create Environment"**
3. Đặt tên: `Development`, `Production`
4. Copy variables vào
5. Switch environments khi test

---

## 🔗 Postman Resources

- **Learning Center:** https://learning.postman.com/
- **API Documentation:** https://www.postman.com/api-documentation-tool/
- **Collection Runner:** https://learning.postman.com/docs/collections/running-collections/intro-to-collection-runs/

---

✅ **Hoàn tất! Bây giờ có thể test tất cả API với Postman!**
