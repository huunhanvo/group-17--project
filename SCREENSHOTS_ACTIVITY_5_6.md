# 📸 HƯỚNG DẪN CHỤP SCREENSHOTS - HOẠT ĐỘNG 5 & 6

## 🎯 MỤC TIÊU
Chụp screenshots chứng minh **Hoạt Động 5** (Activity Logging) và **Hoạt Động 6** (Redux Toolkit + Protected Routes) hoạt động!

---

## 🚀 BƯỚC 0: CHUẨN BỊ

### **0.1: Start Backend & Frontend**

**Cách 1 - Dùng Batch File (KHUYẾN NGHỊ):**
1. Double-click file: `START_BOTH_SERVERS.bat`
2. Sẽ mở 2 cửa sổ CMD:
   - Backend Server (port 3000)
   - Frontend Server (port 3001)
3. Đợi 15-20 giây
4. Browser tự động mở: http://localhost:3001

**Kiểm tra thành công:**
- Backend window: `🚀 Server running on port 3000`
- Frontend window: `webpack compiled successfully`
- Browser: Trang login hiển thị

---

## 📸 HOẠT ĐỘNG 5: ACTIVITY LOGGING SYSTEM (6 ảnh)

---

### 🖼️ **Screenshot A5.1: MongoDB - ActivityLogs Collection**

#### **Mục đích:** Chứng minh ActivityLog model đã lưu dữ liệu vào MongoDB

#### **Các bước:**
1. Mở browser → https://cloud.mongodb.com
2. Login → Click Cluster0
3. Click **"Browse Collections"**
4. Bên trái: Click database **"groupDB"**
5. Click collection **"activitylogs"**

#### **Phải thấy:**
- ✅ Collection name: `activitylogs`
- ✅ Documents với fields:
  ```
  _id: ObjectId("...")
  userId: ObjectId("...")
  action: "login" / "create_user" / "update_user" / "delete_user"
  details: "User logged in successfully"
  ipAddress: "::1" hoặc IP address
  userAgent: "Mozilla/5.0..."
  timestamp: ISODate("2025-10-26...")
  status: "success" / "failed"
  ```

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - Collection name bên trái
   - Table với activity logs
3. **Save as:** `A5_1_MongoDB_ActivityLogs.png`

✅ **Xong Screenshot A5.1!**

---

### 🖼️ **Screenshot A5.2: Postman - GET Activity Logs (Admin only)**

#### **Mục đích:** Chứng minh API GET /api/logs hoạt động

#### **Các bước:**

**Bước 1: Login Admin để lấy token**
1. Postman: New Request
2. Method: **POST**
3. URL: `http://localhost:3000/api/auth/login`
4. Body → raw → JSON:
   ```json
   {
     "email": "admin@example.com",
     "password": "admin123"
   }
   ```
5. Send
6. **Copy accessToken** từ response

**Bước 2: Get Activity Logs**
1. New Request
2. Method: **GET**
3. URL: `http://localhost:3000/api/logs`
4. Headers tab:
   - Key: `Authorization`
   - Value: `Bearer <paste_accessToken>`
5. Send

#### **Phải thấy:**
- ✅ Status: **200 OK**
- ✅ Response body:
  ```json
  {
    "success": true,
    "logs": [
      {
        "_id": "...",
        "userId": {
          "_id": "...",
          "name": "Admin",
          "email": "admin@example.com"
        },
        "action": "login",
        "details": "User logged in successfully",
        "timestamp": "2025-10-26T...",
        "status": "success"
      },
      ...
    ],
    "total": 15
  }
  ```

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - URL bar (GET /api/logs)
   - Headers tab (Authorization header)
   - Response body (logs array)
3. **Save as:** `A5_2_Postman_GET_Logs.png`

✅ **Xong Screenshot A5.2!**

---

### 🖼️ **Screenshot A5.3: Postman - GET User's Activity Logs**

#### **Mục đích:** Chứng minh API GET /api/logs/user/:userId hoạt động

#### **Các bước:**
1. Postman: New Request
2. Method: **GET**
3. URL: `http://localhost:3000/api/logs/user/673c9b26ce25cfa4e7ae6f8a`
   - **Lấy userId:** Copy từ response GET /api/logs ở bước trước
4. Headers:
   - Authorization: `Bearer <admin_token>`
5. Send

#### **Phải thấy:**
- ✅ Status: **200 OK**
- ✅ Response: Logs của user cụ thể
  ```json
  {
    "success": true,
    "logs": [
      {
        "action": "login",
        "details": "User logged in",
        "timestamp": "..."
      }
    ]
  }
  ```

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. **Save as:** `A5_3_Postman_GET_User_Logs.png`

✅ **Xong Screenshot A5.3!**

---

### 🖼️ **Screenshot A5.4: Frontend - Activity Logs Page (Admin)**

#### **Mục đích:** Chứng minh Frontend hiển thị Activity Logs

#### **Các bước:**
1. Browser: http://localhost:3001
2. Login: admin@example.com / admin123
3. Vào Activity Logs page:
   - URL: http://localhost:3001/logs
   - Hoặc click "Activity Logs" trong Admin Panel

#### **Phải thấy:**
- ✅ Title: "Activity Logs" hoặc "Nhật ký hoạt động"
- ✅ Table với columns:
  - User (Name + Email)
  - Action (login, create_user, update_user, delete_user)
  - Details
  - IP Address
  - Timestamp
  - Status (success/failed)
- ✅ Ít nhất 5-10 rows logs

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. Kéo chuột bao toàn trang với logs table
3. **Save as:** `A5_4_Frontend_Activity_Logs_Page.png`

✅ **Xong Screenshot A5.4!**

---

### 🖼️ **Screenshot A5.5: Backend Code - activityLogger Middleware**

#### **Mục đích:** Chứng minh code activityLogger middleware

#### **Các bước:**
1. VSCode: Mở file `backend/middleware/activityLogger.js`
2. Scroll để thấy:
   - Function `logActivity`
   - Function `logActivityManual`
   - Function `logFailedLogin`

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. Kéo chuột bao toàn file (hoặc main functions)
3. **Save as:** `A5_5_Code_ActivityLogger_Middleware.png`

✅ **Xong Screenshot A5.5!**

---

### 🖼️ **Screenshot A5.6: Backend Code - ActivityLog Model**

#### **Mục đích:** Chứng minh ActivityLog Model với TTL index

#### **Các bước:**
1. VSCode: Mở file `backend/models/ActivityLog.js`
2. Scroll để thấy:
   - Schema definition (userId, action, details, timestamp, etc.)
   - TTL index: `expireAfterSeconds: 90 * 24 * 60 * 60` (90 days)

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - Schema fields
   - TTL index code
3. **Save as:** `A5_6_Code_ActivityLog_Model.png`

✅ **Xong Screenshot A5.6!**

---

## 📸 HOẠT ĐỘNG 6: REDUX TOOLKIT + PROTECTED ROUTES (8 ảnh)

---

### 🖼️ **Screenshot A6.1: Redux DevTools - Auth State (Before Login)**

#### **Mục đích:** Chứng minh Redux state TRƯỚC khi login

#### **Các bước:**
1. Browser: http://localhost:3001 (trang login)
2. F12 → Redux tab (phải cài Redux DevTools extension)
3. Click **"State"** (bên trái)
4. Expand `auth` node

#### **Phải thấy:**
```javascript
auth: {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}
```

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - Redux tab
   - State tree với auth expanded
3. **Save as:** `A6_1_Redux_State_Before_Login.png`

✅ **Xong Screenshot A6.1!**

---

### 🖼️ **Screenshot A6.2: Login Page - Redux Form**

#### **Mục đích:** Chứng minh Login page với Redux integration

#### **Các bước:**
1. Browser: http://localhost:3001/login
2. Form phải có:
   - Email input
   - Password input
   - Button "Đăng nhập"

#### **Chụp màn hình:**
1. Nhập email: admin@example.com
2. Nhập password: admin123
3. `Win + Shift + S`
4. **Save as:** `A6_2_Login_Page_Form.png`

✅ **Xong Screenshot A6.2!**

---

### 🖼️ **Screenshot A6.3: Redux DevTools - Login Action Dispatched**

#### **Mục đích:** Chứng minh Redux action được dispatch khi login

#### **Các bước:**
1. Ở trang login, mở Redux DevTools
2. Click tab **"Action"** (thay vì State)
3. Click button "Đăng nhập"
4. **NHANH TAY** chụp ngay!

#### **Phải thấy:**
```
Action: auth/loginUser/pending
Action: auth/loginUser/fulfilled
```

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. Kéo chuột bao Redux Actions list
3. **Save as:** `A6_3_Redux_Login_Action.png`

✅ **Xong Screenshot A6.3!**

---

### 🖼️ **Screenshot A6.4: Redux DevTools - Auth State (After Login)**

#### **Mục đích:** Chứng minh Redux state SAU khi login thành công

#### **Các bước:**
1. Sau khi login thành công (redirect về /profile hoặc /admin)
2. F12 → Redux tab → State
3. Expand `auth` node

#### **Phải thấy:**
```javascript
auth: {
  user: {
    id: "673c9b26...",
    name: "Admin",
    email: "admin@example.com",
    role: "admin"
  },
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  isAuthenticated: true,
  isLoading: false,
  error: null
}
```

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. **Save as:** `A6_4_Redux_State_After_Login.png`

✅ **Xong Screenshot A6.4!**

---

### 🖼️ **Screenshot A6.5: Protected Route - Redirect Unauthenticated**

#### **Mục đích:** Chứng minh Protected Route redirect user chưa login

#### **Các bước:**
1. Browser: Logout (nếu đang login)
2. Thử truy cập: http://localhost:3001/profile
3. Hoặc: http://localhost:3001/admin

#### **Phải thấy:**
- ✅ Tự động redirect về `/login`
- ✅ Toast message: "Please login to access this page" (nếu có)

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. Kéo chuột bao trang login (sau redirect)
3. **Save as:** `A6_5_Protected_Route_Redirect.png`

✅ **Xong Screenshot A6.5!**

---

### 🖼️ **Screenshot A6.6: Protected Route - Role-Based Access (Admin)**

#### **Mục đích:** Chứng minh RBAC - Admin có quyền vào Admin Panel

#### **Các bước:**
1. Login: admin@example.com / admin123
2. Redirect về: http://localhost:3001/admin (hoặc /profile)

#### **Phải thấy:**
- ✅ Admin Dashboard hiển thị
- ✅ Có nút "👑 Admin Panel" hoặc "Manage Users"
- ✅ Stats cards (Total Users, etc.)

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. **Save as:** `A6_6_Admin_Panel_Access.png`

✅ **Xong Screenshot A6.6!**

---

### 🖼️ **Screenshot A6.7: Protected Route - Role-Based Access (User Denied)**

#### **Mục đích:** Chứng minh RBAC - User thường KHÔNG thấy Admin Panel

#### **Các bước:**
1. Logout admin
2. Login: user@example.com / user123
3. Redirect về: http://localhost:3001/profile

#### **Phải thấy:**
- ✅ Profile page hiển thị
- ✅ KHÔNG có nút "Admin Panel"
- ✅ Chỉ có: Profile info, Edit Profile, Logout

#### **Bonus:** Thử truy cập http://localhost:3001/admin
- ✅ Redirect về /profile hoặc hiện "Access Denied"

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. **Save as:** `A6_7_User_Panel_Limited_Access.png`

✅ **Xong Screenshot A6.7!**

---

### 🖼️ **Screenshot A6.8: Redux Code - authSlice.js**

#### **Mục đích:** Chứng minh Redux Toolkit slice code

#### **Các bước:**
1. VSCode: Mở `frontend/src/store/slices/authSlice.js`
2. Scroll để thấy:
   - `createSlice` with name: 'auth'
   - `initialState` với user, tokens, isAuthenticated
   - `createAsyncThunk`: loginUser, logoutUser
   - Reducers: loginSuccess, logout

#### **Chụp màn hình:**
1. `Win + Shift + S`
2. Kéo chuột bao main code sections
3. **Save as:** `A6_8_Code_AuthSlice.png`

✅ **Xong Screenshot A6.8!**

---

## 📊 CHECKLIST HOÀN THÀNH

### ✅ **Hoạt động 5: Activity Logging (6 ảnh)**
- [ ] A5.1 - MongoDB ActivityLogs Collection
- [ ] A5.2 - Postman GET /api/logs
- [ ] A5.3 - Postman GET /api/logs/user/:userId
- [ ] A5.4 - Frontend Activity Logs Page
- [ ] A5.5 - Code activityLogger.js
- [ ] A5.6 - Code ActivityLog.js Model

### ✅ **Hoạt động 6: Redux + Protected Routes (8 ảnh)**
- [ ] A6.1 - Redux State Before Login
- [ ] A6.2 - Login Page Form
- [ ] A6.3 - Redux Login Action
- [ ] A6.4 - Redux State After Login
- [ ] A6.5 - Protected Route Redirect
- [ ] A6.6 - Admin Panel Access
- [ ] A6.7 - User Limited Access
- [ ] A6.8 - Code authSlice.js

**TỔNG: 14 SCREENSHOTS** ✅

---

## 🎯 FILE NAMING

Lưu screenshots theo format:
```
Activity_5_Screenshots/
├── A5_1_MongoDB_ActivityLogs.png
├── A5_2_Postman_GET_Logs.png
├── A5_3_Postman_GET_User_Logs.png
├── A5_4_Frontend_Activity_Logs_Page.png
├── A5_5_Code_ActivityLogger_Middleware.png
└── A5_6_Code_ActivityLog_Model.png

Activity_6_Screenshots/
├── A6_1_Redux_State_Before_Login.png
├── A6_2_Login_Page_Form.png
├── A6_3_Redux_Login_Action.png
├── A6_4_Redux_State_After_Login.png
├── A6_5_Protected_Route_Redirect.png
├── A6_6_Admin_Panel_Access.png
├── A6_7_User_Panel_Limited_Access.png
└── A6_8_Code_AuthSlice.png
```

---

## ⏱️ THỜI GIAN ƯỚC TÍNH

| Activity | Screenshots | Time |
|----------|-------------|------|
| Hoạt động 5 | 6 | 15 phút |
| Hoạt động 6 | 8 | 20 phút |
| **TOTAL** | **14** | **~35 phút** |

---

## 🚀 SẴN SÀNG BẮT ĐẦU!

1. ✅ Double-click `START_BOTH_SERVERS.bat`
2. ✅ Đợi 20 giây cho backend + frontend start
3. ✅ Mở file này `SCREENSHOTS_ACTIVITY_5_6.md`
4. ✅ Follow từng bước
5. ✅ Tick ✅ sau mỗi screenshot

**GOOD LUCK! 📸✨**
