# 🔧 TROUBLESHOOTING - LỖI THÊM USER & TẢI DANH SÁCH

## ❌ LỖI ĐÃ SỬA

### **Lỗi 1: "Có lỗi xảy ra khi thêm user!"**

**Nguyên nhân:**
- AddUser.jsx gọi sai URL: `http://localhost:3000/users` 
- Thiếu `/api` prefix
- Thiếu `password` field (required trong User model)

**✅ Đã sửa:**
```javascript
// ❌ CŨ: axios.post("http://localhost:3000/users", form)
// ✅ MỚI: userAPI.addUser({ name, email, password: "123456" })
```

---

### **Lỗi 2: "❌ Không thể tải danh sách users"**

**Nguyên nhân:**
- Route GET /api/users yêu cầu **authentication** (protected route)
- Cần token + role admin/moderator
- Nếu chưa login hoặc token hết hạn → 401 Unauthorized

**✅ Đã sửa:**
- Thêm error handling chi tiết
- Hiển thị troubleshooting tips
- Nút "Thử lại" để retry

---

## 🚀 CÁCH KIỂM TRA

### **1. Check Backend đang chạy:**

```cmd
# Terminal riêng cho backend
cd backend
npm start
```

**Kết quả mong đợi:**
```
🚀 Server running on port 3000
✅ MongoDB Connected Successfully
🔌 Socket.IO server initialized
```

---

### **2. Check Frontend đang chạy:**

```cmd
# Terminal riêng cho frontend
cd frontend
npm start
```

**Browser mở:** http://localhost:3001

---

### **3. Đảm bảo đã LOGIN:**

**QUAN TRỌNG:** Phải login trước khi test!

```
Email: admin@example.com
Password: admin123
```

Sau khi login, check:
- Header hiển thị: "👤 Xin chào, Admin User"
- Local Storage có `accessToken` và `refreshToken`

**Cách check Local Storage:**
1. F12 → Application tab
2. Left sidebar → Local Storage → http://localhost:3001
3. Phải thấy:
   - `accessToken`: eyJhbGciOiJIUzI1...
   - `refreshToken`: a1b2c3d4e5f6...
   - `user`: {"_id":"...","name":"Admin User",...}

---

### **4. Test Thêm User:**

**Trong Dashboard (sau khi login):**

1. Điền form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `123456` (hoặc để mặc định)

2. Click **➕ Thêm User**

3. **Thành công:**
   ```
   ✅ User đã được thêm thành công!
   ```
   - Form reset về rỗng
   - User mới xuất hiện trong danh sách

4. **Nếu lỗi:**
   - Check console (F12): `❌ Lỗi khi thêm user: ...`
   - Check backend terminal: Có log error không?
   - Email đã tồn tại? → Thử email khác

---

### **5. Test Tải Danh Sách Users:**

**Sau khi login, Dashboard tự động tải:**

1. **Thành công:**
   ```
   ✅ Đã tải 5 users từ MongoDB
   ```
   - Danh sách hiển thị đầy đủ
   - Mỗi user có: Name, Email, ID, CreatedAt

2. **Nếu lỗi 401 (Unauthorized):**
   ```
   ❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!
   ```
   → **Giải pháp:** Logout → Login lại

3. **Nếu lỗi 403 (Forbidden):**
   ```
   ❌ Bạn không có quyền xem danh sách users!
   ```
   → **Giải pháp:** Login với admin account

4. **Nếu lỗi "Không kết nối được backend":**
   ```
   ❌ Không kết nối được backend! Kiểm tra backend có đang chạy không.
   ```
   → **Giải pháp:** Start backend: `cd backend && npm start`

---

## 🔍 DEBUG BẰNG CONSOLE

### **Frontend Console (F12):**

**Thêm user thành công:**
```javascript
🔄 Đang thêm user: { name: "Test User", email: "test@example.com", password: "123456" }
✅ User đã được thêm thành công!
🔄 Làm mới danh sách user...
```

**Thêm user thất bại:**
```javascript
❌ Lỗi khi thêm user: Error: Request failed with status code 400
Error details: { message: "Email đã được sử dụng" }
```

**Tải danh sách thành công:**
```javascript
🔄 Đang tải danh sách users...
📦 Response từ API: { success: true, count: 5, users: [...] }
✅ Đã tải 5 users từ MongoDB
```

**Tải danh sách thất bại:**
```javascript
❌ Lỗi khi tải users: Error: Request failed with status code 401
Error details: { message: "Token không hợp lệ hoặc đã hết hạn", status: 401 }
```

---

### **Backend Terminal:**

**Request thành công:**
```
POST /api/users 201 123ms
✅ User created: test@example.com

GET /api/users 200 45ms
✅ Retrieved 5 users
```

**Request thất bại:**
```
POST /api/users 400 67ms
❌ Email đã được sử dụng

GET /api/users 401 12ms
❌ Token không hợp lệ hoặc đã hết hạn
```

---

## 🎯 CHECKLIST CUỐI CÙNG

Trước khi test, đảm bảo:

- [ ] Backend đang chạy (port 3000)
- [ ] Frontend đang chạy (port 3001)
- [ ] MongoDB Atlas connected
- [ ] Đã chạy seed users (`npm run seed`)
- [ ] Đã login với admin account
- [ ] Browser console không có CORS errors
- [ ] Local Storage có token

---

## 🔥 COMMON ERRORS & FIXES

### **Error: "CORS policy"**
```
Access to XMLHttpRequest at 'http://localhost:3000/api/users' from origin 'http://localhost:3001' 
has been blocked by CORS policy
```

**Fix:** Backend `server.js` phải có:
```javascript
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
```

---

### **Error: "Network Error"**
```
❌ Không kết nối được backend!
```

**Fix:**
1. Check backend đang chạy: `cd backend && npm start`
2. Check port 3000 có process nào đang dùng không
3. Check firewall/antivirus có block không

---

### **Error: "MongoServerError: E11000 duplicate key error"**
```
❌ Email đã được sử dụng
```

**Fix:** Thử email khác hoặc xóa user cũ trong MongoDB Atlas

---

### **Error: "ValidationError: password is required"**
```
❌ Mật khẩu không được để trống
```

**Fix:** ✅ Đã fix! AddUser.jsx giờ gửi password mặc định "123456"

---

### **Error: "Token không hợp lệ hoặc đã hết hạn"**
```
❌ 401 Unauthorized
```

**Fix:**
1. Logout → Login lại
2. Check Local Storage có token không
3. Token hết hạn sau 15 phút → Auto refresh sẽ chạy

---

## 🎉 TẤT CẢ FIX XONG!

Nếu làm theo đúng checklist:
- ✅ Thêm user thành công
- ✅ Tải danh sách users thành công
- ✅ Error messages rõ ràng
- ✅ Troubleshooting dễ dàng

---

**Bây giờ hãy test lại toàn bộ flow!** 🚀
