# 🚀 DEPLOYMENT CHECKLIST - NHANH & DỄ

## ⚡ QUICK START (30 PHÚT)

### **Phase 1: MongoDB Atlas (5 phút)**
- [ ] Login https://cloud.mongodb.com
- [ ] Copy Connection String từ Cluster0
- [ ] Network Access → Add 0.0.0.0/0
- [ ] **Save connection string để dùng sau!**

---

### **Phase 2: Deploy Backend - Render (10 phút)**

#### **Bước 1: Chuẩn bị**
- [ ] Kiểm tra `backend/package.json` có:
  ```json
  "scripts": {
    "start": "node server.js"
  }
  ```
- [ ] Push code lên GitHub: `git push origin main`

#### **Bước 2: Deploy**
- [ ] Vào https://render.com
- [ ] New → Web Service
- [ ] Connect GitHub → chọn repo `group-17--project`
- [ ] Cấu hình:
  - Name: `group-17-backend`
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `npm start`

#### **Bước 3: Environment Variables**
Thêm các biến sau (Click Environment):

```
MONGODB_URI = mongodb+srv://username:password@cluster0...
JWT_SECRET = my_super_secret_key_12345
JWT_REFRESH_SECRET = my_refresh_secret_key_67890
PORT = 3000
NODE_ENV = production
```

- [ ] Click **Create Web Service**
- [ ] Đợi 5 phút deploy
- [ ] Copy URL: `https://group-17-backend.onrender.com`
- [ ] Test: Mở URL trong browser → Thấy message JSON ✅

---

### **Phase 3: Deploy Frontend - Vercel (10 phút)**

#### **Bước 1: Tạo `.env.production`**

Trong `frontend/`, tạo file `.env.production`:

```env
REACT_APP_API_URL=https://group-17-backend.onrender.com
```

**⚠️ Thay bằng URL backend Render của bạn!**

#### **Bước 2: Tạo `vercel.json`**

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

#### **Bước 3: Push & Deploy**

```bash
cd frontend
git add .
git commit -m "Add production config"
cd ..
git push origin main
```

- [ ] Vào https://vercel.com
- [ ] Login GitHub
- [ ] Add New → Project
- [ ] Import `group-17--project`
- [ ] Cấu hình:
  - Framework: Create React App
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `build`

#### **Bước 4: Environment Variables**

Thêm biến:

```
REACT_APP_API_URL = https://group-17-backend.onrender.com
```

- [ ] Click **Deploy**
- [ ] Đợi 3 phút
- [ ] Copy URL: `https://group-17-project.vercel.app`

---

### **Phase 4: Test Production (5 phút)**

- [ ] Mở frontend URL
- [ ] Login: `admin@example.com` / `admin123`
- [ ] Kiểm tra Dashboard hiển thị
- [ ] Click "Activity Logs" → Thấy mock page
- [ ] Logout → Login lại → Thành công
- [ ] F12 → Network → Thấy API calls tới backend Render

---

## ✅ KẾT QUẢ

```
✅ Frontend: https://group-17-project.vercel.app
✅ Backend:  https://group-17-backend.onrender.com
✅ Database: MongoDB Atlas
✅ Login thành công
✅ Protected Routes hoạt động
✅ Redux state management hoạt động
```

---

## 🆘 NẾU GẶP LỖI

### **Backend không start:**
1. Kiểm tra Render logs
2. Kiểm tra `MONGODB_URI` đúng chưa
3. Kiểm tra `package.json` có `"start": "node server.js"`

### **Frontend không call backend:**
1. Kiểm tra `REACT_APP_API_URL` trong Vercel
2. Kiểm tra CORS trong backend `server.js`:
   ```javascript
   app.use(cors({
     origin: ['https://group-17-project.vercel.app'],
     credentials: true
   }));
   ```
3. Redeploy backend sau khi sửa CORS

### **MongoDB connection error:**
1. Kiểm tra password không có ký tự đặc biệt
2. Kiểm tra Network Access → 0.0.0.0/0
3. Test connection string trên local trước

---

## 📝 CẬP NHẬT README

Thêm vào `README.md`:

```markdown
## 🚀 Live Demo

- Frontend: https://group-17-project.vercel.app
- Backend: https://group-17-backend.onrender.com

## Demo Accounts

- Admin: admin@example.com / admin123
- User: user@example.com / user123
```

Commit:
```bash
git add README.md
git commit -m "docs: Add deployment URLs"
git push origin main
```

---

## 🎯 DONE!

**Thời gian:** ~30 phút
**Kết quả:** Ứng dụng chạy online! 🎉
