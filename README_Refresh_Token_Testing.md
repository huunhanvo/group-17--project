# 🔄 Refresh Token Testing Guide

## API Endpoints để test:

### 1. POST /auth/signup - Tạo user mới với refresh token

```bash
POST http://localhost:5000/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Đăng ký thành công",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "abc123xyz...",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user",
    "avatar": ""
  }
}
```

### 2. POST /auth/login - Đăng nhập với refresh token

```bash
POST http://localhost:5000/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "def456uvw...",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user",
    "avatar": ""
  }
}
```

### 3. POST /auth/refresh - Refresh access token

```bash
POST http://localhost:5000/auth/refresh
Content-Type: application/json

{
  "refreshToken": "def456uvw..."
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Token đã được refresh thành công",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "ghi789rst...",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user",
    "avatar": ""
  }
}
```

### 4. GET /auth/me - Test access token

```bash
GET http://localhost:5000/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response:**

```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user",
    "avatar": ""
  }
}
```

### 5. POST /auth/logout - Revoke refresh token

```bash
POST http://localhost:5000/auth/logout
Content-Type: application/json

{
  "refreshToken": "ghi789rst..."
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Đăng xuất thành công. Tất cả tokens đã được revoke."
}
```

## Test Flow:

1. **Signup** → Lấy accessToken và refreshToken
2. **Login** → Lấy tokens mới (old refresh token bị revoke)
3. **Use Access Token** → Call protected routes với Authorization header
4. **Refresh Token** → Khi access token hết hạn (15 phút)
5. **Logout** → Revoke refresh token

## Key Features:

- ✅ Access Token: **15 phút** (ngắn hạn)
- ✅ Refresh Token: **7 ngày** (dài hạn)
- ✅ Refresh Token Rotation (old token bị revoke khi refresh)
- ✅ Device tracking (User-Agent, IP Address)
- ✅ Auto cleanup expired tokens
- ✅ Revoke all tokens on logout

## Database Collections:

- **users** - User information
- **refreshtokens** - Refresh token storage với expiry
