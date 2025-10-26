# 🚀 VERCEL DEPLOYMENT GUIDE

## 📋 Thông tin cần chuẩn bị

Trước khi bắt đầu:
- ✅ GitHub repo đã push code frontend
- ✅ Backend URL từ Render (ví dụ: `https://group-17-backend.onrender.com`)
- ✅ File `.env.production` đã tạo trong `frontend/`

---

## 🔧 BƯỚC 1: Đăng ký Vercel

1. Truy cập: https://vercel.com
2. Click **Sign Up**
3. Chọn **Continue with GitHub**
4. Authorize Vercel truy cập GitHub

---

## 📂 BƯỚC 2: Chuẩn bị Frontend

### 2.1: Tạo file `.env.production`

Trong `frontend/`, tạo file `.env.production`:

```env
REACT_APP_API_URL=https://group-17-backend.onrender.com
```

**⚠️ Thay bằng Backend URL thật của bạn từ Render!**

### 2.2: Tạo file `vercel.json`

Trong `frontend/`, tạo file `vercel.json`:

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

**Mục đích:** Để React Router hoạt động đúng trên production.

### 2.3: Push code lên GitHub

```bash
cd frontend
git add .env.production vercel.json
git commit -m "Add production config for Vercel"
cd ..
git push origin main
```

---

## 🚀 BƯỚC 3: Import Project vào Vercel

### 3.1: Tạo New Project

1. Vào Vercel Dashboard
2. Click **Add New...** → **Project**

### 3.2: Import Repository

1. Tìm repo: `group-17--project`
2. Click **Import**

### 3.3: Configure Project

| Field | Value |
|-------|-------|
| **Project Name** | `group-17-project` (hoặc tên bạn thích) |
| **Framework Preset** | Create React App (auto-detect) |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` (hoặc để trống) |
| **Output Directory** | `build` (hoặc để trống) |
| **Install Command** | `npm install` (hoặc để trống) |

**Vercel thông minh:** Nó tự detect React app và điền các giá trị phù hợp!

---

## 🔐 BƯỚC 4: Environment Variables

Click **Environment Variables** → Thêm:

### Required Variable:

```
Name:  REACT_APP_API_URL
Value: https://group-17-backend.onrender.com
```

**⚠️ QUAN TRỌNG:**
- Thay URL bằng Backend URL thật từ Render
- Biến phải bắt đầu với `REACT_APP_` để React nhận được
- Không có khoảng trắng thừa

### Environment (Optional):

Chọn áp dụng cho:
- ✅ Production
- ✅ Preview
- ✅ Development

---

## 🚀 BƯỚC 5: Deploy

1. Click **Deploy**
2. Vercel sẽ bắt đầu build:
   ```
   Cloning repository...
   Running "npm install"...
   Running "npm run build"...
   Optimizing...
   Build completed
   Deploying...
   ```
3. Đợi 2-3 phút

### Monitor Deployment:

Xem logs real-time:
- ✅ Installing dependencies...
- ✅ Building application...
- ✅ Optimizing assets...
- ✅ Deployment ready!

---

## ✅ BƯỚC 6: Lấy Frontend URL

1. Sau khi deploy thành công
2. Vercel hiển thị:
   ```
   🎉 Deployment ready!
   https://group-17-project.vercel.app
   ```
3. Click URL để mở app!

---

## 🧪 BƯỚC 7: Test Frontend

### Test 1: Mở App

```
https://group-17-project.vercel.app
```

**Kiểm tra:**
- ✅ Login page hiển thị
- ✅ Không có error trong Console (F12)

### Test 2: Login

1. Email: `admin@example.com`
2. Password: `admin123`
3. Click **Đăng nhập**

**Kiểm tra:**
- ✅ Login thành công
- ✅ Redirect về Dashboard
- ✅ User info hiển thị
- ✅ F12 → Network → Thấy API call tới backend Render

### Test 3: Protected Routes

1. Logout
2. Thử vào `/profile` bằng URL: `https://group-17-project.vercel.app/profile`

**Kiểm tra:**
- ✅ Tự động redirect về `/login`

3. Login lại → Vào `/profile`

**Kiểm tra:**
- ✅ Profile page hiển thị

### Test 4: Redux State

1. F12 → Redux tab (cần extension Redux DevTools)
2. Login

**Kiểm tra:**
- ✅ State `auth.isAuthenticated: true`
- ✅ State `auth.user` có thông tin
- ✅ State `auth.accessToken` có token

### Test 5: Mock Activity Logs

1. Click nút **"📊 Activity Logs"**

**Kiểm tra:**
- ✅ Mock page hiển thị với 12 logs
- ✅ Stats cards hiển thị
- ✅ Search & Filter hoạt động

---

## 🆘 TROUBLESHOOTING

### ❌ Build Failed

**Lỗi:** `Command "npm run build" exited with 1`

**Giải pháp:**
1. Xem logs chi tiết tại Vercel Dashboard
2. Test build local:
   ```bash
   cd frontend
   npm run build
   ```
3. Fix lỗi build local trước
4. Push code → Vercel auto redeploy

### ❌ CORS Error

**Lỗi:** `Access to fetch at 'https://...' has been blocked by CORS`

**Nguyên nhân:** Backend chưa allow Vercel domain

**Giải pháp:**

1. Vào `backend/server.js`
2. Cập nhật CORS:
   ```javascript
   const corsOptions = {
     origin: [
       'http://localhost:3001',
       'https://group-17-project.vercel.app', // Thêm dòng này
       'https://*.vercel.app'
     ],
     credentials: true
   };
   app.use(cors(corsOptions));
   ```
3. Push backend:
   ```bash
   git add backend/server.js
   git commit -m "Update CORS for Vercel"
   git push origin main
   ```
4. Render sẽ tự động redeploy backend

### ❌ Environment Variable không hoạt động

**Lỗi:** `process.env.REACT_APP_API_URL` = `undefined`

**Giải pháp:**
1. Vercel Settings → Environment Variables
2. Kiểm tra:
   - ✅ Tên biến đúng: `REACT_APP_API_URL`
   - ✅ Value đúng URL backend
   - ✅ Đã check "Production"
3. **Quan trọng:** Sau khi thêm/sửa biến, phải **Redeploy**:
   - Deployments → Latest → ... → **Redeploy**

### ❌ React Router không hoạt động

**Lỗi:** Refresh page → 404 Not Found

**Giải pháp:**
- Đảm bảo có file `vercel.json` trong `frontend/`
- Nội dung:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```
- Push lại code

### ❌ "Cannot GET /api/..."

**Lỗi:** API không gọi được

**Giải pháp:**
1. F12 → Network → Xem request URL
2. Nếu request tới `http://localhost:3000` → Sai!
3. Kiểm tra:
   - `.env.production` có `REACT_APP_API_URL` đúng
   - Code có dùng `process.env.REACT_APP_API_URL`
   - Vercel Environment Variables đã set

---

## 🔄 UPDATE SAU KHI DEPLOY

### Cách 1: Auto Deploy (Recommended)

Vercel tự động deploy khi push code:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel sẽ tự động build và deploy!

### Cách 2: Manual Redeploy

1. Vercel Dashboard → Project
2. Deployments → Latest
3. Click **...** → **Redeploy**

---

## 🎨 CUSTOM DOMAIN (Optional)

### Thêm Domain riêng:

1. Vercel Dashboard → Project → Settings
2. Domains → Add Domain
3. Nhập: `your-domain.com`
4. Follow hướng dẫn config DNS

**Lưu ý:** Cần mua domain trước (Namecheap, GoDaddy, etc.)

---

## 📝 CHECKLIST HOÀN THÀNH

- [ ] Tạo `.env.production` với backend URL
- [ ] Tạo `vercel.json`
- [ ] Push code lên GitHub
- [ ] Import project vào Vercel
- [ ] Thêm Environment Variable `REACT_APP_API_URL`
- [ ] Deploy thành công
- [ ] Test login → Thành công
- [ ] Test Protected Routes → Hoạt động
- [ ] Test Redux state → Hoạt động
- [ ] Test Mock Activity Logs → Hiển thị đẹp

---

## 🎉 DONE!

Frontend đã chạy online tại:
```
https://group-17-project.vercel.app
```

**Thời gian:** ~10 phút
**Chi phí:** $0 (Free tier)

---

## 📊 KẾT QUẢ CUỐI CÙNG

```
✅ Frontend: https://group-17-project.vercel.app
✅ Backend:  https://group-17-backend.onrender.com
✅ Database: MongoDB Atlas
```

**Demo Accounts:**
```
Admin:     admin@example.com / admin123
User:      user@example.com / user123
Moderator: mod@example.com / mod123
```

**Features:**
- ✅ User Authentication (JWT)
- ✅ Protected Routes
- ✅ Role-Based Access Control
- ✅ Activity Logging (Mock)
- ✅ Redux State Management
- ✅ Responsive UI

---

## ➡️ NEXT STEP

Cập nhật `README.md` với deployment URLs!

Xem: `DEPLOYMENT_GUIDE.md` section "Update README"
