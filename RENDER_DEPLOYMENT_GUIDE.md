# 🚀 RENDER DEPLOYMENT GUIDE

## 📋 Thông tin cần chuẩn bị

Trước khi bắt đầu, chuẩn bị:
- ✅ GitHub repo đã push code backend
- ✅ MongoDB Atlas connection string
- ✅ JWT secrets (bất kỳ chuỗi ngẫu nhiên)

---

## 🔧 BƯỚC 1: Đăng ký Render

1. Truy cập: https://render.com
2. Click **Get Started for Free**
3. Chọn **Sign up with GitHub**
4. Authorize Render truy cập GitHub

---

## 🚀 BƯỚC 2: Tạo Web Service

### 2.1: New Web Service

1. Sau khi login, click **Dashboard**
2. Click **New +** (góc trên bên phải)
3. Chọn **Web Service**

### 2.2: Connect Repository

1. Click **Connect a repository**
2. Tìm repo: `group-17--project`
3. Click **Connect**

### 2.3: Configure Service

Điền thông tin:

| Field | Value |
|-------|-------|
| **Name** | `group-17-backend` (hoặc tên bạn thích) |
| **Region** | Singapore (hoặc gần bạn nhất) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

---

## 🔐 BƯỚC 3: Environment Variables

Click **Advanced** → **Add Environment Variable**

### Required Variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/groupDB?retryWrites=true&w=majority

JWT_SECRET=my_super_secret_key_12345678

JWT_REFRESH_SECRET=my_refresh_secret_key_87654321

PORT=3000

NODE_ENV=production
```

### Optional Variables (nếu có Cloudinary):

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=your_secret
```

### Optional Variables (nếu có Email):

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**⚠️ LƯU Ý:**
- Thay `username`, `password`, `cluster0.xxxxx` trong `MONGODB_URI` bằng thông tin thật
- `JWT_SECRET` và `JWT_REFRESH_SECRET` nên là chuỗi ngẫu nhiên dài 32+ ký tự

---

## 🚀 BƯỚC 4: Deploy

1. Click **Create Web Service**
2. Render sẽ bắt đầu build:
   ```
   ==> Cloning from GitHub...
   ==> Running 'npm install'...
   ==> Running 'npm start'...
   ==> Your service is live 🎉
   ```
3. Đợi 3-5 phút

### Monitor Deployment:

- Xem **Logs** tab để theo dõi quá trình deploy
- Tìm dòng:
  ```
  ✅ MongoDB connected
  🚀 Server running on port 10000
  ```

---

## ✅ BƯỚC 5: Lấy Backend URL

1. Sau khi deploy thành công
2. Copy URL ở trên cùng:
   ```
   https://group-17-backend.onrender.com
   ```
3. **LƯU URL NÀY** để dùng cho Frontend!

---

## 🧪 BƯỚC 6: Test Backend

### Test 1: Health Check

Mở browser hoặc Postman:

```
GET https://group-17-backend.onrender.com/
```

**Kết quả mong đợi:**
```json
{
  "message": "Welcome to User Management API",
  "status": "Server is running"
}
```

### Test 2: Login API

Postman:

```
Method: POST
URL: https://group-17-backend.onrender.com/api/auth/login

Headers:
Content-Type: application/json

Body (JSON):
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

## 🆘 TROUBLESHOOTING

### ❌ Deploy failed: "Application failed to respond"

**Nguyên nhân:** Backend không start được

**Giải pháp:**
1. Vào tab **Logs**
2. Tìm error message
3. Kiểm tra:
   - `MONGODB_URI` đúng chưa?
   - `package.json` có `"start": "node server.js"`?
   - `server.js` có `const PORT = process.env.PORT || 3000`?

### ❌ "MongooseServerSelectionError"

**Nguyên nhân:** Không kết nối được MongoDB

**Giải pháp:**
1. Kiểm tra `MONGODB_URI` chính xác
2. Kiểm tra password không có ký tự đặc biệt (hoặc URL encode)
3. MongoDB Atlas → Network Access → Add IP: `0.0.0.0/0`
4. Test connection string trên local trước

### ❌ "PORT is already in use"

**Nguyên nhân:** Conflict port (hiếm trên Render)

**Giải pháp:**
- Render tự động assign port động
- Đảm bảo code: `const PORT = process.env.PORT || 3000`

### ❌ Backend sleep sau 15 phút

**Nguyên nhân:** Render Free tier tự động sleep

**Giải pháp:**
- Chấp nhận: Backend wake up sau ~30 giây khi có request
- Hoặc nâng cấp lên Starter ($7/month)

---

## 🔄 UPDATE SAU KHI DEPLOY

### Cách 1: Auto Deploy (Recommended)

Render tự động deploy khi bạn push code:

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Render sẽ tự động deploy lại!

### Cách 2: Manual Deploy

1. Vào Dashboard → Service của bạn
2. Click **Manual Deploy** → **Deploy latest commit**

---

## 📝 CHECKLIST HOÀN THÀNH

- [ ] Tạo Web Service thành công
- [ ] Thêm đầy đủ Environment Variables
- [ ] Deploy thành công (không có error)
- [ ] Test Health Check API → 200 OK
- [ ] Test Login API → 200 OK với token
- [ ] Lưu Backend URL để dùng cho Frontend

---

## ➡️ NEXT STEP

**Sau khi Backend chạy thành công:**

Chuyển sang deploy Frontend trên Vercel!

Xem: `VERCEL_DEPLOYMENT_GUIDE.md`

---

## 🎉 DONE!

Backend đã chạy online tại:
```
https://group-17-backend.onrender.com
```

**Thời gian:** ~10 phút
**Chi phí:** $0 (Free tier)
