# Test Script cho Activities 2-5

## 🔹 Test Nhanh Tất Cả Chức Năng

### Test Activity 2: RBAC
```bash
# 1. Test Admin Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# 2. Get All Users (Admin only)
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# 3. Create New User (Admin only)
curl -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"user"}'
```

### Test Activity 3: Avatar Upload
```bash
# 1. Upload Avatar
curl -X POST http://localhost:3000/avatar/upload \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "avatar=@path/to/your/image.jpg"

# 2. Delete Avatar
curl -X DELETE http://localhost:3000/avatar/delete \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Test Activity 4: Forgot Password
```bash
# 1. Request Password Reset
curl -X POST http://localhost:3000/password/forgot \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com"}'

# 2. Reset Password (lấy token từ email)
curl -X POST http://localhost:3000/password/reset/YOUR_RESET_TOKEN \
  -H "Content-Type: application/json" \
  -d '{"password":"newpassword123"}'
```

### Test Activity 5: Rate Limiting
```bash
# Test Login Rate Limit (5 failed attempts trong 15 phút)
for i in {1..6}; do
  echo "Attempt $i:"
  curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@example.com","password":"wrongpassword"}'
  echo ""
done

# Lần thứ 6 sẽ trả về: "Too many login attempts, please try again after 15 minutes"
```

## 🔹 Check Logs
```bash
# View combined logs
cat backend/logs/combined.log

# View error logs only
cat backend/logs/error.log

# View HTTP request logs
cat backend/logs/http.log

# Watch logs in real-time
tail -f backend/logs/combined.log
```

## 🔹 Test với Postman

### Import Collection
Tạo Postman Collection với các request sau:

**Folder: Authentication**
1. POST {{baseUrl}}/auth/signup
2. POST {{baseUrl}}/auth/login
3. POST {{baseUrl}}/auth/refresh-token

**Folder: Users (RBAC)**
1. GET {{baseUrl}}/api/users (Admin)
2. POST {{baseUrl}}/api/users (Admin)
3. GET {{baseUrl}}/api/users/:id (Admin/Moderator)
4. PUT {{baseUrl}}/api/users/:id (Admin/Self)
5. DELETE {{baseUrl}}/api/users/:id (Admin)
6. PUT {{baseUrl}}/api/users/:id/role (Admin)
7. GET {{baseUrl}}/api/users/profile/me (All authenticated)

**Folder: Avatar**
1. POST {{baseUrl}}/avatar/upload (multipart/form-data)
2. DELETE {{baseUrl}}/avatar/delete

**Folder: Password**
1. POST {{baseUrl}}/password/forgot
2. POST {{baseUrl}}/password/reset/:token

**Environment Variables:**
```
baseUrl = http://localhost:3000
token = <your_jwt_token_here>
```

## 🔹 Expected Responses

### ✅ Success - Get All Users (Admin)
```json
{
  "success": true,
  "count": 5,
  "users": [
    {
      "_id": "...",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "avatar": "https://cloudinary.com/...",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### ✅ Success - Upload Avatar
```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "avatar": "https://res.cloudinary.com/your-cloud/image/upload/v123/avatars/xyz.webp"
}
```

### ✅ Success - Forgot Password
```json
{
  "success": true,
  "message": "Reset password email sent successfully"
}
```

### ❌ Error - Unauthorized
```json
{
  "success": false,
  "message": "Not authorized, token required"
}
```

### ❌ Error - Forbidden (Wrong Role)
```json
{
  "success": false,
  "message": "Access denied. Admin role required"
}
```

### ❌ Error - Rate Limited
```json
{
  "success": false,
  "message": "Too many requests, please try again after 15 minutes"
}
```

## 🔹 Quick Health Check
```bash
# Check if backend is running
curl http://localhost:3000/

# Check MongoDB connection
# (Backend logs sẽ hiển thị "MongoDB connected successfully")

# Check all routes
curl http://localhost:3000/api/users/profile/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

**Tip:** Sử dụng Postman hoặc Thunder Client (VS Code extension) để test API dễ dàng hơn!
