# 🎯 DEPLOYMENT - TÓM TẮT 30 PHÚT

## 📊 TỔNG QUAN

**3 bước chính:**
1. MongoDB Atlas (Database) - 5 phút
2. Render (Backend) - 10 phút
3. Vercel (Frontend) - 10 phút

**Tổng thời gian:** ~30 phút
**Chi phí:** $0 (tất cả dùng free tier)

---

## ⚡ QUICK STEPS

### **Phase 1: MongoDB Atlas (5 phút)**

1. https://cloud.mongodb.com → Login
2. Cluster0 → Connect → Copy connection string
3. Network Access → Add IP: `0.0.0.0/0`
4. **LƯU:** Connection string để dùng sau

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/groupDB
```

---

### **Phase 2: Render - Backend (10 phút)**

**Files cần chuẩn bị:** ✅ (Đã có sẵn)
- `backend/package.json` với `"start": "node server.js"`
- `backend/server.js` với `PORT = process.env.PORT || 3000`
- CORS config đã update cho Vercel

**Deployment:**

1. https://render.com → Sign up with GitHub
2. New → Web Service
3. Connect repo: `group-17--project`
4. Config:
   - Name: `group-17-backend`
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`

5. Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=my_secret_key_12345
   JWT_REFRESH_SECRET=my_refresh_secret_67890
   PORT=3000
   NODE_ENV=production
   ```

6. Create Web Service → Đợi 5 phút
7. **LƯU:** Backend URL: `https://group-17-backend.onrender.com`
8. Test: `https://group-17-backend.onrender.com/` → Thấy JSON

---

### **Phase 3: Vercel - Frontend (10 phút)**

**Files cần chuẩn bị:** ✅ (Đã tạo sẵn)
- `frontend/.env.production` ← Cập nhật backend URL
- `frontend/vercel.json` ← Config React Router

**Cập nhật `.env.production`:**

```env
REACT_APP_API_URL=https://group-17-backend.onrender.com
```

**⚠️ Thay bằng Backend URL thật!**

**Push code:**

```bash
cd frontend
git add .env.production vercel.json
git commit -m "Add production config"
cd ..
git push origin main
```

**Deployment:**

1. https://vercel.com → Sign up with GitHub
2. Add New → Project
3. Import repo: `group-17--project`
4. Config:
   - Framework: Create React App
   - Root Directory: `frontend`
   - (Các field khác để auto)

5. Environment Variable:
   ```
   REACT_APP_API_URL=https://group-17-backend.onrender.com
   ```

6. Deploy → Đợi 3 phút
7. **LƯU:** Frontend URL: `https://group-17-project.vercel.app`

---

## ✅ TEST PRODUCTION

### **1. Test Backend:**

```
GET https://group-17-backend.onrender.com/
→ Response: { message: "Welcome to...", status: "Server is running" }
```

### **2. Test Frontend:**

```
https://group-17-project.vercel.app
→ Login page hiển thị
```

### **3. Test Login:**

```
Email: admin@example.com
Password: admin123
→ Login thành công → Dashboard hiển thị
```

### **4. Test Protected Routes:**

```
Logout → Thử vào /profile
→ Tự động redirect về /login ✅
```

### **5. Test Redux:**

```
F12 → Redux tab → Login
→ State auth.isAuthenticated: true ✅
```

### **6. Test Mock Activity Logs:**

```
Click "📊 Activity Logs"
→ Mock page với 12 logs hiển thị ✅
```

---

## 🆘 TROUBLESHOOTING NHANH

### **Backend không start:**
- Kiểm tra Render Logs
- Kiểm tra `MONGODB_URI` đúng
- Kiểm tra MongoDB Network Access → 0.0.0.0/0

### **Frontend không call backend:**
- Kiểm tra `REACT_APP_API_URL` trong Vercel
- Kiểm tra CORS trong backend
- Redeploy backend sau khi sửa CORS
- Redeploy frontend sau khi sửa env

### **Environment variable không hoạt động:**
- Sau khi thêm/sửa biến → Phải **Redeploy**
- Vercel/Render không tự động redeploy

---

## 📝 CHECKLIST HOÀN CHỈNH

### **MongoDB Atlas:**
- [ ] Cluster đang chạy
- [ ] Connection string đã lưu
- [ ] Network Access: 0.0.0.0/0

### **Backend (Render):**
- [ ] Deploy thành công
- [ ] Environment variables đầy đủ
- [ ] Test API health check → OK
- [ ] Test login API → OK
- [ ] Backend URL đã lưu

### **Frontend (Vercel):**
- [ ] `.env.production` đã cập nhật backend URL
- [ ] `vercel.json` đã tạo
- [ ] Deploy thành công
- [ ] Environment variable `REACT_APP_API_URL` đã set
- [ ] Test login → Thành công
- [ ] Test Protected Routes → Hoạt động
- [ ] Frontend URL đã lưu

---

## 🎉 KẾT QUẢ

```
✅ Frontend: https://group-17-project.vercel.app
✅ Backend:  https://group-17-backend.onrender.com
✅ Database: MongoDB Atlas
```

**Demo Accounts:**
```
Admin: admin@example.com / admin123
User:  user@example.com / user123
```

**Features hoạt động:**
- ✅ Authentication & Authorization
- ✅ Protected Routes
- ✅ RBAC (Admin, User, Moderator)
- ✅ Activity Logging (Mock)
- ✅ Redux State Management
- ✅ Responsive UI

---

## 📄 TÀI LIỆU CHI TIẾT

- `DEPLOYMENT_GUIDE.md` - Hướng dẫn đầy đủ
- `RENDER_DEPLOYMENT_GUIDE.md` - Chi tiết Render
- `VERCEL_DEPLOYMENT_GUIDE.md` - Chi tiết Vercel
- `DEPLOYMENT_CHECKLIST.md` - Checklist từng bước

---

## 🎯 DONE!

Ứng dụng đã chạy online! 🚀

**Thời gian:** ~30 phút
**Chi phí:** $0
**Trạng thái:** Production Ready ✅
