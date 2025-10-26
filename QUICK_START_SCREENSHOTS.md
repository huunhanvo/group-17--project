# 🚀 QUICK START - HOẠT ĐỘNG 5 & 6

## ⚡ START SERVERS (Bước đầu tiên)

### **Double-click file này:**
```
START_BOTH_SERVERS.bat
```

**Đợi 20 giây** cho đến khi thấy:
- Backend window: `🚀 Server running on port 3000`
- Frontend window: `webpack compiled successfully`

---

## 📸 HOẠT ĐỘNG 5: ACTIVITY LOGGING (6 ảnh - 15 phút)

---

### ✅ **Screenshot A5.1: MongoDB ActivityLogs**

**Link mở:** https://cloud.mongodb.com

**Steps:**
1. Login MongoDB
2. Click Cluster0
3. Click "Browse Collections"
4. Click "groupDB" → "activitylogs"
5. `Win + Shift + S` → Chụp
6. Save: `A5_1_MongoDB_ActivityLogs.png`

---

### ✅ **Screenshot A5.2: Postman GET Logs**

**STEP 1 - Login Admin (Copy paste vào Postman):**

```
Method: POST
URL: http://localhost:3000/api/auth/login

Body (JSON):
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**STEP 2 - Copy accessToken từ response**

**STEP 3 - Get Logs:**

```
Method: GET
URL: http://localhost:3000/api/logs

Headers:
Key: Authorization
Value: Bearer <paste_accessToken_vào_đây>
```

**STEP 4:** `Win + Shift + S` → Chụp → Save: `A5_2_Postman_GET_Logs.png`

---

### ✅ **Screenshot A5.3: Postman GET User Logs**

**Copy userId từ response A5.2**

```
Method: GET
URL: http://localhost:3000/api/logs/user/<paste_userId>

Headers:
Authorization: Bearer <paste_accessToken>
```

Chụp → Save: `A5_3_Postman_GET_User_Logs.png`

---

### ✅ **Screenshot A5.4: Frontend Activity Logs Page**

**Link:** http://localhost:3001

**Steps:**
1. Login: admin@example.com / admin123
2. Vào: http://localhost:3001/logs
3. `Win + Shift + S` → Chụp table
4. Save: `A5_4_Frontend_Activity_Logs_Page.png`

---

### ✅ **Screenshot A5.5: Code activityLogger.js**

**File:** `backend/middleware/activityLogger.js`

1. Mở VSCode → File này
2. `Win + Shift + S` → Chụp code
3. Save: `A5_5_Code_ActivityLogger_Middleware.png`

---

### ✅ **Screenshot A5.6: Code ActivityLog.js Model**

**File:** `backend/models/ActivityLog.js`

1. Mở VSCode → File này
2. Chụp schema + TTL index
3. Save: `A5_6_Code_ActivityLog_Model.png`

---

## 📸 HOẠT ĐỘNG 6: REDUX + PROTECTED ROUTES (8 ảnh - 20 phút)

---

### ✅ **Screenshot A6.1: Redux State BEFORE Login**

**Link:** http://localhost:3001

**Steps:**
1. Browser: http://localhost:3001 (logout nếu đang login)
2. F12 → Redux tab
3. Click "State" → Expand "auth"
4. Phải thấy:
   ```
   user: null
   isAuthenticated: false
   ```
5. Chụp → Save: `A6_1_Redux_State_Before_Login.png`

**CHÚ Ý:** Phải cài extension "Redux DevTools" trên Chrome!

---

### ✅ **Screenshot A6.2: Login Page Form**

**Link:** http://localhost:3001/login

**Steps:**
1. Nhập: admin@example.com / admin123
2. CHƯA CLICK "Đăng nhập"
3. Chụp form → Save: `A6_2_Login_Page_Form.png`

---

### ✅ **Screenshot A6.3: Redux Login Action**

**Steps:**
1. F12 → Redux tab → Click "Action"
2. Click "Đăng nhập"
3. NHANH TAY chụp khi thấy:
   ```
   auth/loginUser/pending
   auth/loginUser/fulfilled
   ```
4. Save: `A6_3_Redux_Login_Action.png`

---

### ✅ **Screenshot A6.4: Redux State AFTER Login**

**Steps:**
1. Sau login thành công
2. F12 → Redux tab → State → Expand "auth"
3. Phải thấy:
   ```
   user: {name: "Admin", ...}
   isAuthenticated: true
   accessToken: "eyJ..."
   ```
4. Chụp → Save: `A6_4_Redux_State_After_Login.png`

---

### ✅ **Screenshot A6.5: Protected Route Redirect**

**Steps:**
1. Logout (nếu đang login)
2. Thử vào: http://localhost:3001/profile
3. Tự động redirect về /login
4. Chụp → Save: `A6_5_Protected_Route_Redirect.png`

---

### ✅ **Screenshot A6.6: Admin Panel Access**

**Steps:**
1. Login: admin@example.com / admin123
2. Thấy Admin Dashboard
3. Chụp → Save: `A6_6_Admin_Panel_Access.png`

---

### ✅ **Screenshot A6.7: User Limited Access**

**Steps:**
1. Logout
2. Login: user@example.com / user123
3. Chỉ thấy Profile, KHÔNG có Admin Panel
4. Chụp → Save: `A6_7_User_Panel_Limited_Access.png`

---

### ✅ **Screenshot A6.8: Code authSlice.js**

**File:** `frontend/src/store/slices/authSlice.js`

1. Mở VSCode → File này
2. Chụp createSlice, initialState, loginUser thunk
3. Save: `A6_8_Code_AuthSlice.png`

---

## ✅ CHECKLIST HOÀN THÀNH

### **Hoạt động 5:**
- [ ] A5.1 - MongoDB ActivityLogs
- [ ] A5.2 - Postman GET Logs
- [ ] A5.3 - Postman GET User Logs
- [ ] A5.4 - Frontend Logs Page
- [ ] A5.5 - Code activityLogger.js
- [ ] A5.6 - Code ActivityLog.js

### **Hoạt động 6:**
- [ ] A6.1 - Redux State Before
- [ ] A6.2 - Login Form
- [ ] A6.3 - Redux Action
- [ ] A6.4 - Redux State After
- [ ] A6.5 - Protected Redirect
- [ ] A6.6 - Admin Access
- [ ] A6.7 - User Limited
- [ ] A6.8 - Code authSlice.js

**TOTAL: 14 screenshots** ✅

---

## 🎯 TIP NHANH

### **Postman JSON Bodies (Copy paste):**

**Login:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**User login:**
```json
{
  "email": "user@example.com",
  "password": "user123"
}
```

### **URLs:**

```
Backend: http://localhost:3000
Frontend: http://localhost:3001
MongoDB: https://cloud.mongodb.com
```

---

## ⏱️ TIMELINE

- Hoạt động 5: ~15 phút
- Hoạt động 6: ~20 phút
- **TOTAL: 35 phút**

---

## 🚀 BẮT ĐẦU NGAY!

1. Double-click `START_BOTH_SERVERS.bat`
2. Đợi 20 giây
3. Follow checklist trên
4. Tick ✅ sau mỗi ảnh

**GOOD LUCK! 📸**
