# 📸 HƯỚNG DẪN CHỤP SCREENSHOTS TỪNG BƯỚC CHI TIẾT

## 🎯 MỤC TIÊU
Hướng dẫn **KHÔNG BỎ SÓT BƯỚC NÀO** để chụp 20+ screenshots hoàn hảo!

---

## 🛠️ CHUẨN BỊ TRƯỚC KHI BẮT ĐẦU

### ✅ **Bước 0.1: Kiểm tra Tools**

#### Tool chụp ảnh (Windows):
1. **Windows Snipping Tool** (Khuyến nghị - Dễ nhất)
   - Nhấn: `Win + Shift + S`
   - Hoặc: Start Menu → Gõ "Snipping Tool" → Enter
   
2. **Print Screen + Paint**
   - Nhấn: `PrtScn` (Print Screen)
   - Mở Paint → Ctrl+V → Save
   
3. **Snip & Sketch** (Windows 10/11)
   - Win + Shift + S
   - Chọn vùng → Tự động copy → Click notification → Save

#### Browser (Khuyến nghị: Chrome):
- ✅ Đã cài đặt Chrome hoặc Edge
- ✅ Zoom 100% (Ctrl+0)
- ✅ Có thể ẩn bookmarks bar (Ctrl+Shift+B)

---

### ✅ **Bước 0.2: Khởi động Backend & Frontend**

#### Start Backend:
```cmd
# Cách 1: Double-click file
D:\Class\Class_Phat_Trien_Phan_Mem_Ma_Nguon_Mo\buoi4\group-17--project\start-backend.bat

# Cách 2: CMD
cd D:\Class\Class_Phat_Trien_Phan_Mem_Ma_Nguon_Mo\buoi4\group-17--project\backend
npm start
```

**Kiểm tra thành công:**
```
✅ MongoDB connected
🚀 Server running on port 3000
🔌 Socket.IO ready for connections
```

#### Start Frontend:
```cmd
# Cách 1: Double-click file
D:\Class\Class_Phat_Trien_Phan_Mem_Ma_Nguon_Mo\buoi4\group-17--project\start-frontend.bat

# Cách 2: CMD
cd D:\Class\Class_Phat_Trien_Phan_Mem_Ma_Nguon_Mo\buoi4\group-17--project\frontend
npm start
```

**Kiểm tra thành công:**
- Browser tự động mở: http://localhost:3001
- Trang login hiển thị

---

### ✅ **Bước 0.3: Mở các Tabs cần thiết**

**Mở 5 tabs trong Chrome:**
1. http://localhost:3001 (Frontend)
2. https://cloud.mongodb.com (MongoDB Atlas)
3. https://cloudinary.com (Cloudinary Dashboard)
4. https://mail.google.com (Gmail)
5. Postman hoặc Thunder Client (VSCode)

---

## 📸 PHẦN 1: MONGODB ATLAS (3 ảnh)

---

### 🖼️ **Screenshot #1: MongoDB Atlas Dashboard**

#### **Bước 1.1: Đăng nhập MongoDB Atlas**
1. Mở browser → Vào https://cloud.mongodb.com
2. Nhập email/password → Click "Sign In"
3. Đợi trang load xong

#### **Bước 1.2: Vào Dashboard**
1. Click vào "Cluster0" (hoặc tên cluster của bạn)
2. Đợi trang cluster hiển thị
3. Thấy:
   - ✅ Cluster name: Cluster0
   - ✅ Status: Connected (màu xanh)
   - ✅ Database: groupDB
   - ✅ Collections: 3-5 collections

#### **Bước 1.3: Chụp màn hình**
1. Nhấn `Win + Shift + S`
2. Click chọn "Rectangular Snip" (hình chữ nhật)
3. Kéo chuột bao trùm toàn bộ Dashboard
4. Ảnh tự động copy vào clipboard

#### **Bước 1.4: Lưu ảnh**
1. Click notification (góc phải dưới màn hình)
2. Ảnh mở ra → Click icon "💾 Save"
3. Đặt tên: `01_MongoDB_Dashboard.png`
4. Save vào folder: `D:\...\group-17--project\screenshots\`

**✅ Xong Screenshot #1!**

---

### 🖼️ **Screenshot #2: Users Collection**

#### **Bước 2.1: Vào Collections**
1. Ở trang MongoDB Atlas Dashboard
2. Click button **"Browse Collections"** (màu xanh)
3. Đợi trang load

#### **Bước 2.2: Chọn Users Collection**
1. Bên trái: Thấy list databases
2. Click **"groupDB"** (hoặc tên database của bạn)
3. Click **"users"** collection
4. Bên phải hiển thị danh sách users

#### **Bước 2.3: Kiểm tra dữ liệu**
Phải thấy ít nhất 3-5 users với fields:
- ✅ _id
- ✅ name (ví dụ: "Admin", "User One")
- ✅ email (ví dụ: "admin@example.com")
- ✅ password (hashed)
- ✅ role (admin, user, moderator)
- ✅ avatar (URL hoặc null)
- ✅ createdAt

#### **Bước 2.4: Chụp màn hình**
1. Nhấn `Win + Shift + S`
2. Kéo chuột bao trùm:
   - Database name bên trái
   - Collection name
   - Table với users data
3. Click notification → Save
4. Đặt tên: `02_MongoDB_Users_Collection.png`

**✅ Xong Screenshot #2!**

---

### 🖼️ **Screenshot #3: Activity Logs Collection**

#### **Bước 3.1: Chọn ActivityLogs Collection**
1. Vẫn ở trang Browse Collections
2. Bên trái: Click **"activitylogs"** collection
3. Bên phải: Danh sách logs hiển thị

#### **Bước 3.2: Kiểm tra logs**
Phải thấy logs với:
- ✅ userId (ObjectId)
- ✅ action ("login", "create_user", "update_user", etc.)
- ✅ details (mô tả chi tiết)
- ✅ timestamp (ngày giờ)
- ✅ ipAddress
- ✅ status ("success" hoặc "failed")

#### **Bước 3.3: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao trùm table với logs
3. Save as: `03_MongoDB_ActivityLogs.png`

**✅ Xong Screenshot #3!**

---

## 📸 PHẦN 2: BACKEND - POSTMAN (4 ảnh)

---

### 🖼️ **Screenshot #4: Backend Terminal Running**

#### **Bước 4.1: Kiểm tra Backend đang chạy**
1. Mở terminal/CMD chạy backend
2. Phải thấy output:
   ```
   [dotenv@17.2.3] injecting env (10) from .env
   🔌 Socket.IO server initialized
   📂 Loading routes...
   ✅ user routes loaded
   ✅ auth routes loaded
   ✅ socket routes loaded
   ✅ avatar routes loaded
   ✅ password routes loaded
   ✅ logs routes loaded
   🚀 Server running on port 3000
   ✅ MongoDB connected
   ```

#### **Bước 4.2: Chụp terminal**
1. Click vào cửa sổ terminal
2. `Win + Shift + S`
3. Kéo chuột bao toàn bộ terminal (đủ thấy tất cả dòng success)
4. Save as: `04_Backend_Terminal_Running.png`

**✅ Xong Screenshot #4!**

---

### 🖼️ **Screenshot #5: Postman - Login Success**

#### **Bước 5.1: Mở Postman**
1. Start Menu → Gõ "Postman" → Enter
2. Hoặc: VSCode → Extensions → Thunder Client icon (⚡)

#### **Bước 5.2: Tạo request LOGIN**
1. Click **"New Request"** (hoặc "+" tab)
2. Chọn method: **POST**
3. URL: `http://localhost:3000/api/auth/login`

#### **Bước 5.3: Thêm Body**
1. Click tab **"Body"**
2. Chọn **"raw"**
3. Dropdown: Chọn **"JSON"**
4. Nhập:
   ```json
   {
     "email": "admin@example.com",
     "password": "admin123"
   }
   ```

#### **Bước 5.4: Send request**
1. Click button **"Send"** (màu xanh)
2. Đợi response hiện ra (1-2 giây)

#### **Bước 5.5: Kiểm tra response**
Phải thấy:
- ✅ Status: **200 OK** (màu xanh)
- ✅ Response body có:
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": "...",
      "name": "Admin",
      "email": "admin@example.com",
      "role": "admin"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### **Bước 5.6: QUAN TRỌNG - Copy accessToken**
1. Trong response, tìm **"accessToken"**
2. **Copy toàn bộ token** (từ `eyJ...` đến hết)
3. Paste vào Notepad tạm (sẽ dùng cho screenshot tiếp theo)

#### **Bước 5.7: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - URL bar với POST + endpoint
   - Body tab với JSON
   - Response với 200 OK + data
3. Save as: `05_Postman_Login_Success.png`

**✅ Xong Screenshot #5!**

---

### 🖼️ **Screenshot #6: Postman - Get Users (With Auth)**

#### **Bước 6.1: Tạo request mới**
1. Postman: New Request (hoặc "+ New Tab")
2. Method: **GET**
3. URL: `http://localhost:3000/api/users`

#### **Bước 6.2: Thêm Authorization Header**
1. Click tab **"Headers"**
2. Thêm header mới:
   - **Key:** `Authorization`
   - **Value:** `Bearer <paste_accessToken_từ_bước_5.6>`
   
   **CHÚ Ý:** Phải có chữ `Bearer` và **1 dấu cách** trước token!
   
   Ví dụ:
   ```
   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M...
   ```

#### **Bước 6.3: Send request**
1. Click **"Send"**
2. Đợi response

#### **Bước 6.4: Kiểm tra response**
Phải thấy:
- ✅ Status: **200 OK**
- ✅ Response body: Array of users
  ```json
  {
    "success": true,
    "users": [
      {
        "_id": "...",
        "name": "Admin",
        "email": "admin@example.com",
        "role": "admin"
      },
      {
        "_id": "...",
        "name": "User One",
        "email": "user@example.com",
        "role": "user"
      },
      ...
    ]
  }
  ```

#### **Bước 6.5: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - URL bar (GET /api/users)
   - **Headers tab** (phải thấy Authorization header)
   - Response với users array
3. Save as: `06_Postman_Get_Users.png`

**✅ Xong Screenshot #6!**

---

### 🖼️ **Screenshot #7: Postman - Error 403 Forbidden**

#### **Bước 7.1: Login user thường**
1. Quay lại request POST /api/auth/login
2. Đổi body:
   ```json
   {
     "email": "user@example.com",
     "password": "user123"
   }
   ```
3. Send
4. Copy **accessToken** của user thường

#### **Bước 7.2: Tạo request DELETE user**
1. New Request
2. Method: **DELETE**
3. URL: `http://localhost:3000/api/users/673c9b26ce25cfa4e7ae6f8a`
   
   **Lấy ID user:** Copy `_id` từ response GET /api/users ở bước 6

#### **Bước 7.3: Thêm token USER THƯỜNG**
1. Headers tab
2. Authorization: `Bearer <accessToken_của_user_thường>`

#### **Bước 7.4: Send request**
1. Click Send
2. Đợi response

#### **Bước 7.5: Kiểm tra response**
Phải thấy:
- ✅ Status: **403 Forbidden** (màu đỏ/cam)
- ✅ Response body:
  ```json
  {
    "message": "Access denied. Admins only"
  }
  ```

#### **Bước 7.6: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - URL bar (DELETE endpoint)
   - Headers tab (token user thường)
   - Response với **403 Forbidden**
3. Save as: `07_Postman_Error_403.png`

**✅ Xong Screenshot #7!**

---

## 📸 PHẦN 3: FRONTEND - AUTHENTICATION (4 ảnh)

---

### 🖼️ **Screenshot #8: Login Page**

#### **Bước 8.1: Mở Frontend**
1. Browser → http://localhost:3001
2. Nếu đang login, logout trước:
   - Click "Logout" button
   - Hoặc xóa localStorage: F12 → Application → Local Storage → Clear

#### **Bước 8.2: Kiểm tra trang Login**
Phải thấy:
- ✅ Title: "User Management - Đăng nhập"
- ✅ Form:
  - Email input
  - Password input
- ✅ Button: "Đăng nhập"
- ✅ Link: "Quên mật khẩu?"
- ✅ Demo accounts box (nếu có):
  ```
  👤 Demo accounts:
  Admin: admin@example.com / admin123
  User: user@example.com / user123
  ```

#### **Bước 8.3: Chụp màn hình**
1. Zoom 100% (Ctrl+0)
2. Ẩn bookmarks bar (Ctrl+Shift+B)
3. `Win + Shift + S`
4. Kéo chuột bao toàn bộ trang login
5. Save as: `08_Frontend_Login_Page.png`

**✅ Xong Screenshot #8!**

---

### 🖼️ **Screenshot #9: Login Success with Toast**

#### **Bước 9.1: Chuẩn bị chụp nhanh**
**CHÚ Ý:** Toast notification chỉ hiện 3-5 giây, phải chụp NHANH!

**Cách 1 - Snipping Tool sẵn sàng:**
1. Mở Snipping Tool trước
2. Click "New" → Chọn "Rectangular"
3. ĐỪNG KÉO CHUỘT, để đó
4. Qua bước 9.2

**Cách 2 - Dùng Screen Recording:**
1. Win + G (Xbox Game Bar)
2. Click Record button (● màu trắng)
3. Sau khi login thành công, stop recording
4. Mở video → Screenshot frame có toast

#### **Bước 9.2: Login**
1. Nhập:
   - Email: `admin@example.com`
   - Password: `admin123`
2. **NHANH TAY:** Click "Đăng nhập"
3. **NGAY LẬP TỨC:**
   - Nếu dùng Cách 1: Kéo chuột chụp ngay khi toast hiện
   - Nếu dùng Cách 2: Để recording chạy

#### **Bước 9.3: Chụp Toast**
Phải thấy:
- ✅ Toast notification (góc trên phải):
  - Icon: 🎉 hoặc ✅
  - Text: "Chào mừng Admin!" hoặc "Login successful"
  - Màu xanh/xanh lá

#### **Bước 9.4: Lưu ảnh**
1. Save as: `09_Frontend_Login_Success_Toast.png`

**TIP:** Nếu không kịp chụp, thử:
- Thêm `setTimeout` trong code để delay redirect
- Hoặc F12 → Console → Gõ: `localStorage.clear()` → Thử login lại

**✅ Xong Screenshot #9!**

---

### 🖼️ **Screenshot #10: Profile Page**

#### **Bước 10.1: Login (nếu chưa login)**
1. Login với admin@example.com / admin123
2. Đợi redirect xong

#### **Bước 10.2: Vào Profile**
1. Tìm button "👤 Profile" (navbar/header)
2. Click vào
3. Hoặc URL: http://localhost:3001/profile

#### **Bước 10.3: Kiểm tra Profile page**
Phải thấy:
- ✅ Title: "Profile" hoặc "Thông tin cá nhân"
- ✅ Avatar (nếu có upload)
- ✅ User info:
  - Name: "Admin"
  - Email: "admin@example.com"
  - Role: "admin"
  - Ngày tạo: "..."
- ✅ Buttons:
  - Edit Profile
  - Change Password
  - Upload Avatar
  - Logout

#### **Bước 10.4: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao toàn trang Profile
3. Save as: `10_Frontend_Profile_Page.png`

**✅ Xong Screenshot #10!**

---

### 🖼️ **Screenshot #11: Logout & LocalStorage Cleared**

#### **Bước 11.1: Mở DevTools**
1. Nhấn `F12` (hoặc Ctrl+Shift+I)
2. Click tab **"Application"**
3. Bên trái: **"Local Storage"** → Click vào `http://localhost:3001`

#### **Bước 11.2: Kiểm tra tokens TRƯỚC logout**
Phải thấy:
- ✅ Key: `accessToken` → Value: "eyJhbG..."
- ✅ Key: `refreshToken` → Value: "eyJhbG..."
- ✅ Key: `user` → Value: "{...}"

#### **Bước 11.3: Sắp xếp màn hình**
1. Resize browser window nhỏ lại (1/2 màn hình)
2. DevTools dock bên phải (⋮ icon → Dock side: right)
3. Đảm bảo thấy:
   - Trang Profile bên trái
   - DevTools Application tab bên phải

#### **Bước 11.4: Logout**
1. Click button **"Logout"**
2. Đợi 1-2 giây

#### **Bước 11.5: Kiểm tra KẾT QUẢ**
- ✅ Redirect về /login
- ✅ LocalStorage: accessToken, refreshToken, user đều **BIẾN MẤT**
- ✅ Toast: "Đã đăng xuất thành công"

#### **Bước 11.6: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - Login page bên trái (sau logout)
   - DevTools Application tab bên phải (localStorage trống)
3. Save as: `11_Frontend_Logout.png`

**✅ Xong Screenshot #11!**

---

## 📸 PHẦN 4: FRONTEND - CRUD USERS (4 ảnh)

---

### 🖼️ **Screenshot #12: Dashboard - User List**

#### **Bước 12.1: Login admin**
1. Login: admin@example.com / admin123

#### **Bước 12.2: Vào Dashboard**
1. URL: http://localhost:3001/dashboard
2. Hoặc click "Dashboard" trong navbar
3. Hoặc click "👑 Admin Panel"

#### **Bước 12.3: Kiểm tra Dashboard**
Phải thấy:
- ✅ Title: "User Management Dashboard"
- ✅ Table/List users:
  - Columns: Name, Email, Role, Actions
  - Rows: Ít nhất 3-5 users
- ✅ Button: "Add User" hoặc "+ Thêm user mới"
- ✅ Search bar (nếu có)

#### **Bước 12.4: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao toàn Dashboard với user table
3. Save as: `12_Frontend_Dashboard_UserList.png`

**✅ Xong Screenshot #12!**

---

### 🖼️ **Screenshot #13: Add User Form**

#### **Bước 13.1: Click Add User**
1. Ở Dashboard
2. Click button **"Add User"** hoặc **"+ Thêm user mới"**
3. Modal/Form hiện ra

#### **Bước 13.2: Kiểm tra Form**
Phải thấy:
- ✅ Form title: "Thêm User Mới"
- ✅ Fields:
  - Name (text input)
  - Email (email input)
  - Password (password input)
  - Role (select dropdown: admin, moderator, user)
- ✅ Buttons:
  - Submit / Tạo mới (màu xanh)
  - Cancel / Hủy (màu xám)

#### **Bước 13.3: Fill form (KHÔNG submit)**
1. Name: `Test User`
2. Email: `test@example.com`
3. Password: `test123`
4. Role: `user`

**CHÚ Ý:** ĐỪNG click Submit, chỉ fill form để chụp ảnh!

#### **Bước 13.4: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao toàn bộ Modal/Form
3. Save as: `13_Frontend_Add_User_Form.png`

**✅ Xong Screenshot #13!**

---

### 🖼️ **Screenshot #14: Edit User Modal**

#### **Bước 14.1: Close Add User form**
1. Click "Cancel" hoặc "X" để đóng form
2. Quay về Dashboard

#### **Bước 14.2: Click Edit**
1. Tìm 1 user trong table (ví dụ: user@example.com)
2. Click icon **"✏️ Edit"** hoặc button **"Edit"**
3. Edit Modal hiện ra

#### **Bước 14.3: Kiểm tra Edit Form**
Phải thấy:
- ✅ Form title: "Chỉnh sửa User" hoặc "Edit User"
- ✅ Fields **ĐÃ ĐIỀN SẴN** với data hiện tại:
  - Name: "User One" (hoặc tên user bạn chọn)
  - Email: "user@example.com"
  - Role: "user" (dropdown đã select)
- ✅ Buttons: Save, Cancel

#### **Bước 14.4: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao toàn Modal
3. Save as: `14_Frontend_Edit_User.png`

**✅ Xong Screenshot #14!**

---

### 🖼️ **Screenshot #15: Delete Confirmation**

#### **Bước 15.1: Close Edit form**
1. Click "Cancel"

#### **Bước 15.2: Click Delete**
1. Tìm 1 user (khác admin) trong table
2. Click icon **"🗑️ Delete"** hoặc button **"Delete"**
3. Confirmation dialog hiện ra

#### **Bước 15.3: Kiểm tra Confirmation**
Phải thấy:
- ✅ Dialog title: "Xác nhận xóa" hoặc "Confirm Delete"
- ✅ Message: "Bạn có chắc muốn xóa user này?"
- ✅ User info: Name, Email hiển thị
- ✅ Warning: "Hành động này không thể hoàn tác!"
- ✅ Buttons:
  - Xóa / Delete (màu đỏ)
  - Hủy / Cancel (màu xám)

**CHÚ Ý:** ĐỪNG click "Xóa", chỉ chụp ảnh!

#### **Bước 15.4: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao toàn Confirmation dialog
3. Save as: `15_Frontend_Delete_Confirmation.png`

**✅ Xong Screenshot #15!**

---

## 📸 PHẦN 5: ADVANCED FEATURES (6 ảnh)

---

### 🖼️ **Screenshot #16: Redux DevTools - Auth State**

#### **Bước 16.1: Kiểm tra Redux DevTools Extension**
1. Mở Chrome Web Store
2. Search: "Redux DevTools"
3. Nếu chưa cài: Click "Add to Chrome"
4. Reload trang web

#### **Bước 16.2: Mở DevTools**
1. F12
2. Tìm tab **"Redux"** (bên cạnh Console, Elements)
3. Click vào tab Redux

#### **Bước 16.3: Xem State Tree**
1. Bên trái: Click **"State"** (không phải "Diff" hay "Action")
2. Expand node: **`auth`**
3. Thấy:
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

#### **Bước 16.4: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - Redux tab
   - State tree với `auth` expanded
3. Save as: `16_Redux_DevTools_State.png`

**✅ Xong Screenshot #16!**

---

### 🖼️ **Screenshot #17: Activity Logs Page**

#### **Bước 17.1: Vào Activity Logs**
1. Login admin (nếu chưa login)
2. URL: http://localhost:3001/logs
3. Hoặc: Admin Panel → Click "Activity Logs"

#### **Bước 17.2: Kiểm tra Logs Page**
Phải thấy:
- ✅ Title: "Activity Logs" hoặc "Nhật ký hoạt động"
- ✅ Table với columns:
  - User
  - Action (login, create_user, update_user, delete_user)
  - Details
  - IP Address
  - Timestamp
  - Status (success/failed)
- ✅ Filters (nếu có):
  - By User
  - By Action
  - By Date Range

#### **Bước 17.3: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao toàn trang với logs table
3. Save as: `17_Activity_Logs_Page.png`

**✅ Xong Screenshot #17!**

---

### 🖼️ **Screenshot #18: Socket.IO - Online Users Count**

#### **Bước 18.1: Chuẩn bị 2 browsers**
**Cách 1:** 2 browsers khác nhau
- Chrome + Edge

**Cách 2:** 1 browser + 1 incognito
- Chrome thường + Chrome Incognito (Ctrl+Shift+N)

#### **Bước 18.2: Login 2 users**
**Browser 1:**
1. http://localhost:3001/login
2. Login: admin@example.com / admin123

**Browser 2 (Incognito):**
1. http://localhost:3001/login
2. Login: user@example.com / user123

#### **Bước 18.3: Kiểm tra Online Count**
Cả 2 browsers phải thấy (ở header/navbar):
- ✅ "👥 2 users online"
- ✅ Hoặc icon với số 2

#### **Bước 18.4: Kiểm tra Console**
1. Browser 1: F12 → Console
2. Phải thấy:
   ```
   ✅ Socket.IO connected
   Socket ID: abc123xyz...
   Connected to server
   ```

#### **Bước 18.5: Chụp màn hình**
**Option A - Chụp Header:**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - Header/Navbar với "2 users online"
3. Save as: `18_SocketIO_Online_Users.png`

**Option B - Chụp Console:**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - Console tab với Socket.IO logs
3. Save as: `18_SocketIO_Console_Logs.png`

**Khuyến nghị:** Chụp CẢ 2 ảnh!

**✅ Xong Screenshot #18!**

---

### 🖼️ **Screenshot #19: Upload Avatar Success**

#### **Bước 19.1: Vào Profile**
1. Login admin
2. Click "👤 Profile"

#### **Bước 19.2: Upload Avatar**
1. Click button **"Upload Avatar"** hoặc **"📷 Change Avatar"**
2. Dialog/Modal hiện ra
3. Click **"Choose File"** hoặc **"Browse"**
4. Chọn 1 ảnh từ máy (ví dụ: ảnh profile, logo)
5. Click **"Upload"** hoặc **"Submit"**
6. Đợi upload (có loading spinner)
7. Success message: "Avatar uploaded successfully!"

#### **Bước 19.3: Kiểm tra Avatar hiển thị**
Phải thấy:
- ✅ Avatar mới hiển thị trong Profile page
- ✅ Avatar hiển thị trong Navbar/Header
- ✅ URL avatar: `https://res.cloudinary.com/...`

#### **Bước 19.4: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - Profile page với avatar mới
   - Success toast (nếu còn hiển thị)
3. Save as: `19_Upload_Avatar_Success.png`

**Bonus:** Mở DevTools → Network tab → Tìm request `/api/avatar/upload` → Chụp response

**✅ Xong Screenshot #19!**

---

### 🖼️ **Screenshot #20: Cloudinary Dashboard**

#### **Bước 20.1: Login Cloudinary**
1. Browser → https://cloudinary.com
2. Click "Log In"
3. Nhập email/password → Sign In

#### **Bước 20.2: Vào Media Library**
1. Dashboard → Click **"Media Library"** (menu bên trái)
2. Hoặc top menu: **"Media Library"**

#### **Bước 20.3: Vào folder avatars**
1. Bên trái: Folders tree
2. Click folder **"avatars"** (hoặc tên folder bạn config)
3. Bên phải: List uploaded images

#### **Bước 20.4: Kiểm tra images**
Phải thấy:
- ✅ Ít nhất 1-2 avatar images
- ✅ Thumbnail preview
- ✅ File details: Size, Format (jpg/png), Dimensions

#### **Bước 20.5: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao:
   - Folders tree bên trái
   - Images grid bên phải
3. Save as: `20_Cloudinary_Dashboard.png`

**✅ Xong Screenshot #20!**

---

### 🖼️ **Screenshot #21: Gmail - Reset Password Email**

#### **Bước 21.1: Test Forgot Password**
1. Frontend: Logout (nếu đang login)
2. Login page → Click **"Quên mật khẩu?"**
3. Nhập email: `user@example.com`
4. Click **"Gửi email reset"**
5. Toast: "Email reset đã được gửi"

#### **Bước 21.2: Check Gmail**
1. Mở https://mail.google.com
2. Inbox → Tìm email mới nhất
3. Subject: "Password Reset Request" hoặc "Đặt lại mật khẩu"
4. From: Email bạn config trong `EMAIL_USER`

#### **Bước 21.3: Mở email**
1. Click vào email
2. Xem nội dung

#### **Bước 21.4: Kiểm tra email content**
Phải thấy:
- ✅ Greeting: "Hi User,"
- ✅ Message: "You requested to reset your password..."
- ✅ Button/Link: **"Reset Password"** (URL: http://localhost:3001/reset-password/TOKEN)
- ✅ Note: "Link expires in 1 hour"

#### **Bước 21.5: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao toàn bộ email content
3. Save as: `21_Gmail_Reset_Email.png`

**✅ Xong Screenshot #21!**

---

### 🖼️ **Screenshot #22: Password Reset Success**

#### **Bước 22.1: Click Reset Link**
1. Trong Gmail email
2. Click button **"Reset Password"**
3. Browser mở tab mới: http://localhost:3001/reset-password/TOKEN

#### **Bước 22.2: Reset Password Page**
Phải thấy:
- ✅ Title: "Đặt lại mật khẩu"
- ✅ Form:
  - New Password (password input)
  - Confirm Password (password input)
- ✅ Button: "Đặt lại mật khẩu"

#### **Bước 22.3: Fill form**
1. New Password: `newpassword123`
2. Confirm Password: `newpassword123`
3. Click **"Đặt lại mật khẩu"**

#### **Bước 22.4: Success**
Phải thấy:
- ✅ Toast: "Mật khẩu đã được đổi thành công!"
- ✅ Auto redirect về /login (sau 2-3 giây)

#### **Bước 22.5: Chụp màn hình**
**Option A - Chụp Success Toast:**
1. `Win + Shift + S`
2. Kéo chuột bao trang với toast
3. Save as: `22_Password_Reset_Success.png`

**Option B - Chụp Login page + test:**
1. Login với password mới: user@example.com / newpassword123
2. Thành công → Chụp màn hình

**✅ Xong Screenshot #22!**

---

## 🎁 BONUS SCREENSHOTS (Optional)

---

### 🖼️ **Screenshot #23: RBAC - Admin Panel**

#### **Bước 23.1: Login Admin**
1. admin@example.com / admin123

#### **Bước 23.2: Admin Dashboard**
Phải thấy:
- ✅ Title: "👑 Admin Panel" hoặc "Admin Dashboard"
- ✅ Stats cards:
  - Total Users: 5
  - Today's Logins: 3
  - Active Sessions: 2
- ✅ Buttons/Links:
  - Manage Users
  - View Activity Logs
  - System Settings

#### **Bước 23.3: Chụp màn hình**
1. `Win + Shift + S`
2. Save as: `23_BONUS_Admin_Panel.png`

---

### 🖼️ **Screenshot #24: RBAC - User Panel**

#### **Bước 24.1: Login User thường**
1. Logout admin
2. Login: user@example.com / user123

#### **Bước 24.2: User Dashboard**
Phải thấy:
- ✅ KHÔNG có nút "👑 Admin Panel"
- ✅ CHỈ có: Profile, My Activities
- ✅ Limited features

#### **Bước 24.3: Chụp màn hình**
1. `Win + Shift + S`
2. Save as: `24_BONUS_User_Panel.png`

---

### 🖼️ **Screenshot #25: Token Refresh - Network Tab**

#### **Bước 25.1: Login**
1. Login bất kỳ user

#### **Bước 25.2: Mở Network Tab**
1. F12 → Network tab
2. Filter: XHR hoặc Fetch

#### **Bước 25.3: Gọi API**
1. Vào Dashboard hoặc Profile (gọi API protected)
2. Hoặc đợi 15 phút cho token expire

#### **Bước 25.4: Thấy Token Refresh**
Phải thấy trong Network tab:
- ✅ Request: POST `/api/auth/refresh`
- ✅ Status: 200 OK
- ✅ Response:
  ```json
  {
    "accessToken": "new_token..."
  }
  ```

#### **Bước 25.5: Chụp màn hình**
1. `Win + Shift + S`
2. Kéo chuột bao Network tab
3. Save as: `25_BONUS_Token_Refresh_Network.png`

---

## 📊 CHECKLIST CUỐI CÙNG

### ✅ **Trước khi nộp bài:**

- [ ] Đủ 20+ ảnh (tối thiểu)
- [ ] Tất cả ảnh rõ nét, Full HD
- [ ] File name đúng format: `01_..., 02_...`
- [ ] Không có thông tin nhạy cảm (full JWT token, password plaintext)
- [ ] Tất cả screenshots có trong 1 folder
- [ ] Đã test xem tất cả ảnh mở được

### 📦 **Tạo folder Screenshots:**

```
D:\...\group-17--project\screenshots\
├── 01_MongoDB_Dashboard.png
├── 02_MongoDB_Users_Collection.png
├── 03_MongoDB_ActivityLogs.png
├── 04_Backend_Terminal_Running.png
├── 05_Postman_Login_Success.png
├── 06_Postman_Get_Users.png
├── 07_Postman_Error_403.png
├── 08_Frontend_Login_Page.png
├── 09_Frontend_Login_Success_Toast.png
├── 10_Frontend_Profile_Page.png
├── 11_Frontend_Logout.png
├── 12_Frontend_Dashboard_UserList.png
├── 13_Frontend_Add_User_Form.png
├── 14_Frontend_Edit_User.png
├── 15_Frontend_Delete_Confirmation.png
├── 16_Redux_DevTools_State.png
├── 17_Activity_Logs_Page.png
├── 18_SocketIO_Online_Users.png
├── 19_Upload_Avatar_Success.png
├── 20_Cloudinary_Dashboard.png
├── 21_Gmail_Reset_Email.png
├── 22_Password_Reset_Success.png
├── 23_BONUS_Admin_Panel.png (optional)
├── 24_BONUS_User_Panel.png (optional)
└── 25_BONUS_Token_Refresh_Network.png (optional)
```

---

## 🎯 ESTIMATED TIME

| Phase | Screenshots | Time |
|-------|-------------|------|
| MongoDB | 3 | 5 phút |
| Backend/Postman | 4 | 8 phút |
| Frontend Auth | 4 | 7 phút |
| Frontend CRUD | 4 | 8 phút |
| Advanced Features | 6 | 12 phút |
| **TOTAL** | **21** | **~40 phút** |

**Bonus:** +10-15 phút (nếu làm thêm)

---

## 🆘 TROUBLESHOOTING

### ❓ "Không thấy Redux tab trong DevTools"
**Giải pháp:**
1. Install extension: https://chrome.google.com/webstore/detail/redux-devtools
2. Reload trang web
3. F12 → Tab Redux xuất hiện

### ❓ "Toast notification biến mất quá nhanh"
**Giải pháp:**
1. Dùng Screen Recording (Win+G)
2. Hoặc edit code: Tăng toast duration lên 5000ms

### ❓ "Không nhận được email reset password"
**Giải pháp:**
1. Check Spam folder
2. Kiểm tra `.env`: EMAIL_USER, EMAIL_PASSWORD đúng
3. Check backend logs: Có lỗi gửi email không?

### ❓ "Postman không thấy response"
**Giải pháp:**
1. Kiểm tra backend đang chạy: http://localhost:3000
2. Check URL đúng: http://localhost:3000/api/...
3. Check Headers: Authorization có "Bearer " không?

---

## ✨ TIPS CHỤP ẢNH ĐẸP

1. **Zoom 100%** - Ctrl+0
2. **Ẩn Bookmarks Bar** - Ctrl+Shift+B
3. **Fullscreen** - F11 (optional)
4. **Clean Desktop** - Ẩn icons desktop
5. **Dark Theme** - Đẹp hơn Light theme
6. **Annotations** - Dùng tool vẽ arrow, highlight (optional)

---

## 🚀 READY TO GO!

**Bắt đầu từ Screenshot #1 và follow từng bước!**

Nếu gặp vấn đề, hãy hỏi tôi ngay! 💪📸
