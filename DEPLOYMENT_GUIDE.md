# 🚀 HƯỚNG DẪN DEPLOY ỨNG DỤNG HOÀN CHỈNH

## 📋 MỤC LỤC

1. [Chuẩn bị trước khi deploy](#1-chuẩn-bị-trước-khi-deploy)
2. [Deploy MongoDB Atlas (Database)](#2-deploy-mongodb-atlas-database)
3. [Deploy Backend lên Render](#3-deploy-backend-lên-render)
4. [Deploy Frontend lên Vercel](#4-deploy-frontend-lên-vercel)
5. [Kiểm tra & Test](#5-kiểm-tra--test)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. CHUẨN BỊ TRƯỚC KHI DEPLOY

### ✅ **Checklist:**

- [ ] GitHub repo đã push code lên (frontend + backend)
- [ ] MongoDB Atlas đã tạo cluster
- [ ] Có tài khoản Vercel (đăng nhập bằng GitHub)
- [ ] Có tài khoản Render (đăng nhập bằng GitHub)
- [ ] Đã test local thành công (backend port 3000, frontend port 3001)

### 📦 **Tạo file cần thiết:**

#### **Backend: Tạo `.gitignore`**

Đảm bảo file `.gitignore` trong `backend/` có:

```
node_modules/
.env
.DS_Store
*.log
```

#### **Frontend: Tạo `.gitignore`**

Đảm bảo file `.gitignore` trong `frontend/` có:

```
node_modules/
build/
.env.local
.env.development.local
.env.test.local
.env.production.local
.DS_Store
```

---

## 2. DEPLOY MONGODB ATLAS (DATABASE)

### **Bước 1: Lấy Connection String**

1. Truy cập: https://cloud.mongodb.com
2. Login vào account
3. Click **Cluster0** → **Connect**
4. Chọn: **Connect your application**
5. Copy **Connection String**:
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/groupDB?retryWrites=true&w=majority
   ```
6. **Thay `<password>`** bằng password thật của MongoDB user

### **Bước 2: Whitelist IP cho Production**

1. Vào **Network Access** (menu bên trái)
2. Click **Add IP Address**
3. Chọn: **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

**⚠️ Lưu ý:** Connection String này sẽ dùng cho Backend deployment!

---

## 3. DEPLOY BACKEND LÊN RENDER

### **Bước 1: Chuẩn bị Backend**

#### **3.1.1: Kiểm tra `package.json`**

Mở `backend/package.json`, đảm bảo có:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### **3.1.2: Kiểm tra `server.js`**

Đảm bảo backend lắng nghe port động:

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

#### **3.1.3: Kiểm tra `.env` (LOCAL - KHÔNG push lên GitHub)**

File `backend/.env` chỉ dùng local:

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
PORT=3000
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_USER=...
EMAIL_PASS=...
```

**⚠️ Không push `.env` lên GitHub!**

### **Bước 2: Push Backend lên GitHub**

```bash
cd backend
git add .
git commit -m "Prepare backend for deployment"
git push origin main
```

### **Bước 3: Deploy trên Render**

#### **3.3.1: Tạo Web Service**

1. Truy cập: https://render.com
2. Click **New** → **Web Service**
3. Connect GitHub account → chọn repo: `group-17--project`
4. Cấu hình:

   - **Name:** `group-17-backend` (hoặc tên bạn muốn)
   - **Region:** Singapore (hoặc gần nhất)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

#### **3.3.2: Thêm Environment Variables**

Click **Environment** → **Add Environment Variable**:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster0...` |
| `JWT_SECRET` | `your_secret_key_here_12345` |
| `JWT_REFRESH_SECRET` | `your_refresh_secret_key_67890` |
| `PORT` | `3000` |
| `NODE_ENV` | `production` |
| `CLOUDINARY_CLOUD_NAME` | `your_cloud_name` (nếu có) |
| `CLOUDINARY_API_KEY` | `your_api_key` (nếu có) |
| `CLOUDINARY_API_SECRET` | `your_api_secret` (nếu có) |
| `EMAIL_USER` | `your_email@gmail.com` (nếu có) |
| `EMAIL_PASS` | `your_app_password` (nếu có) |

#### **3.3.3: Deploy**

1. Click **Create Web Service**
2. Đợi 3-5 phút để Render build và deploy
3. Xem logs để kiểm tra:
   ```
   ==> Building...
   ==> Installing dependencies...
   ==> Starting service...
   🚀 Server running on port 3000
   ✅ MongoDB connected successfully
   ```
4. Copy URL backend: `https://group-17-backend.onrender.com`

### **Bước 4: Test Backend API**

#### **4.1: Test Health Check**

```bash
curl https://group-17-backend.onrender.com/
```

Hoặc mở browser: https://group-17-backend.onrender.com

**Kết quả mong đợi:**
```json
{
  "message": "Welcome to User Management API",
  "status": "Server is running"
}
```

#### **4.2: Test Login API (Postman)**

```
Method: POST
URL: https://group-17-backend.onrender.com/api/auth/login
Body (JSON):
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Kết quả:** 200 OK với accessToken + user info

---

## 4. DEPLOY FRONTEND LÊN VERCEL

### **Bước 1: Chuẩn bị Frontend**

#### **4.1.1: Tạo file `.env.production`**

Trong `frontend/`, tạo file `.env.production`:

```env
REACT_APP_API_URL=https://group-17-backend.onrender.com
PORT=3001
```

**⚠️ Quan trọng:** Thay URL backend bằng URL Render của bạn!

#### **4.1.2: Cập nhật API calls**

Kiểm tra tất cả API calls trong frontend đều dùng:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Ví dụ:
fetch(`${API_URL}/api/auth/login`, {...})
```

#### **4.1.3: Tạo `vercel.json` (Optional - nếu dùng React Router)**

Trong `frontend/`, tạo `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### **Bước 2: Push Frontend lên GitHub**

```bash
cd frontend
git add .
git commit -m "Prepare frontend for deployment"
git push origin main
```

### **Bước 3: Deploy trên Vercel**

#### **4.3.1: Import Project**

1. Truy cập: https://vercel.com
2. Login bằng GitHub
3. Click **Add New** → **Project**
4. Import repo: `group-17--project`

#### **4.3.2: Cấu hình Project**

- **Framework Preset:** Create React App (auto-detect)
- **Root Directory:** `frontend`
- **Build Command:** `npm run build` (hoặc để trống - auto)
- **Output Directory:** `build` (hoặc để trống - auto)
- **Install Command:** `npm install` (hoặc để trống - auto)

#### **4.3.3: Thêm Environment Variables**

Click **Environment Variables**:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://group-17-backend.onrender.com` |

**⚠️ Thay bằng URL backend Render của bạn!**

#### **4.3.4: Deploy**

1. Click **Deploy**
2. Đợi 2-3 phút
3. Vercel sẽ build và deploy
4. Xem logs:
   ```
   Building...
   Compiling...
   Build completed
   Deployment ready
   ```
5. Copy URL frontend: `https://group-17-project.vercel.app`

### **Bước 4: Test Frontend**

1. Mở browser: `https://group-17-project.vercel.app`
2. Thử login:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Kiểm tra:
   - ✅ Login thành công
   - ✅ Redirect về dashboard
   - ✅ Hiển thị user info
   - ✅ Các API calls hoạt động
   - ✅ Protected routes hoạt động

---

## 5. KIỂM TRA & TEST

### ✅ **Checklist hoàn chỉnh:**

#### **Database (MongoDB Atlas):**
- [ ] Cluster đang chạy
- [ ] Connection string đúng
- [ ] IP whitelist: 0.0.0.0/0
- [ ] Collections đã có dữ liệu mẫu

#### **Backend (Render):**
- [ ] Deploy thành công
- [ ] Logs không có lỗi
- [ ] Health check API hoạt động
- [ ] Login API hoạt động
- [ ] Environment variables đầy đủ
- [ ] CORS cho phép frontend domain

#### **Frontend (Vercel):**
- [ ] Deploy thành công
- [ ] Build không có lỗi
- [ ] REACT_APP_API_URL đúng
- [ ] Login page hiển thị
- [ ] Login thành công
- [ ] Dashboard hiển thị data
- [ ] Protected Routes hoạt động

### 🧪 **Test Flow đầy đủ:**

1. **Test Signup:**
   - Vào frontend
   - Click "Đăng ký"
   - Nhập thông tin → Submit
   - Kiểm tra redirect về dashboard

2. **Test Login:**
   - Logout
   - Login lại
   - Kiểm tra token lưu localStorage
   - Kiểm tra user info hiển thị

3. **Test Protected Routes:**
   - Logout
   - Thử truy cập `/profile` → Redirect về `/login`
   - Login → Vào `/profile` → Thành công

4. **Test RBAC:**
   - Login admin → Thấy "Admin Panel"
   - Login user → Không thấy "Admin Panel"

5. **Test Activity Logs:**
   - Click "Activity Logs"
   - Thấy mock page với 12 logs

6. **Test Redux:**
   - F12 → Redux tab
   - Login → Thấy state change
   - Logout → State clear

---

## 6. TROUBLESHOOTING

### ❌ **Backend không start trên Render:**

**Lỗi:** `Application failed to respond`

**Giải pháp:**
1. Kiểm tra logs: Render Dashboard → Logs
2. Kiểm tra `PORT` environment variable
3. Kiểm tra `server.js`:
   ```javascript
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, '0.0.0.0', () => {...});
   ```
4. Kiểm tra `package.json` có `"start": "node server.js"`

### ❌ **MongoDB connection failed:**

**Lỗi:** `MongooseServerSelectionError`

**Giải pháp:**
1. Kiểm tra `MONGODB_URI` trong Render Environment Variables
2. Kiểm tra password không có ký tự đặc biệt (hoặc encode URL)
3. Kiểm tra Network Access → Allow 0.0.0.0/0
4. Thử connection string trên local trước

### ❌ **Frontend không call được Backend:**

**Lỗi:** `CORS error` hoặc `Network error`

**Giải pháp:**
1. Kiểm tra `REACT_APP_API_URL` trong Vercel Environment Variables
2. Kiểm tra backend CORS config:
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:3001',
       'https://group-17-project.vercel.app'
     ],
     credentials: true
   }));
   ```
3. Redeploy backend sau khi thêm CORS
4. Kiểm tra Network tab (F12) xem request URL đúng chưa

### ❌ **Vercel build failed:**

**Lỗi:** `Build failed`

**Giải pháp:**
1. Kiểm tra logs trong Vercel deployment
2. Kiểm tra `package.json` dependencies đầy đủ
3. Test build local: `npm run build`
4. Kiểm tra không có lỗi ESLint nghiêm trọng
5. Thêm `.env.production` với biến môi trường

### ❌ **Environment variables không hoạt động:**

**Lỗi:** `undefined` khi log `process.env.REACT_APP_API_URL`

**Giải pháp:**
1. Frontend: Biến phải bắt đầu với `REACT_APP_`
2. Sau khi thêm biến, phải **Redeploy** (không tự động)
3. Vercel: Settings → Environment Variables → Add → Redeploy
4. Render: Environment → Add → Manual Deploy

### ❌ **Render free tier sleep:**

**Vấn đề:** Backend ngủ sau 15 phút không dùng

**Giải pháp:**
1. Chấp nhận: Backend sẽ wake up sau ~30 giây khi có request
2. Hoặc nâng cấp lên paid plan
3. Hoặc dùng cron job ping backend mỗi 10 phút

---

## 🎉 KẾT QUẢ CUỐI CÙNG

### **URLs Production:**

```
Frontend: https://group-17-project.vercel.app
Backend:  https://group-17-backend.onrender.com
Database: mongodb+srv://cluster0.xxxxx.mongodb.net/groupDB
```

### **Demo Accounts:**

```
Admin:
  Email: admin@example.com
  Password: admin123

User:
  Email: user@example.com
  Password: user123

Moderator:
  Email: mod@example.com
  Password: mod123
```

### **Features hoạt động:**

- ✅ User Registration & Login
- ✅ JWT Authentication (Access + Refresh Token)
- ✅ Protected Routes
- ✅ Role-Based Access Control (Admin, Moderator, User)
- ✅ Activity Logging (Mock)
- ✅ Redux State Management
- ✅ User Profile Management
- ✅ Responsive UI

---

## 📝 CẬP NHẬT SAU KHI DEPLOY

### **Cập nhật README.md:**

Thêm vào `README.md`:

```markdown
## 🚀 Live Demo

- **Frontend:** https://group-17-project.vercel.app
- **Backend API:** https://group-17-backend.onrender.com
- **Database:** MongoDB Atlas

## 🔑 Demo Accounts

- **Admin:** admin@example.com / admin123
- **User:** user@example.com / user123

## 🛠️ Tech Stack

- **Frontend:** React 19.2.0 + Redux Toolkit
- **Backend:** Node.js + Express 5.1.0
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (Frontend) + Render (Backend)
```

### **Commit & Push:**

```bash
git add README.md
git commit -m "docs: Update README with deployment URLs"
git push origin main
```

---

## 🎯 NEXT STEPS

### **Sau khi deploy thành công:**

1. ✅ Test toàn bộ features trên production
2. ✅ Chụp screenshots production URLs
3. ✅ Ghi lại video demo
4. ✅ Cập nhật README.md với URLs
5. ✅ Nộp link GitHub + video demo

### **Tối ưu (Optional):**

- Custom domain cho Vercel
- SSL certificate (Vercel + Render tự động có)
- CDN cho static assets
- Rate limiting cho production
- Monitoring & logging (Sentry, LogRocket)
- CI/CD pipeline (GitHub Actions)

---

## 🆘 HỖ TRỢ

Nếu gặp vấn đề:

1. Kiểm tra logs:
   - Render: Dashboard → Logs
   - Vercel: Deployment → View Function Logs
2. Kiểm tra Environment Variables
3. Test API với Postman
4. Kiểm tra Network tab trong Chrome DevTools
5. Google error message cụ thể

**Good luck với deployment! 🚀**
