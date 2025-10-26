# 📸 SCREENSHOTS GUIDE - 20+ ẢNH CHO BUỔI 6# 📸 HƯỚNG DẪN CHỤP ẢNH THEO YÊU CẦU BUỔI 6



## 🎯 MỤC TIÊU## 🎯 TỔNG SỐ SCREENSHOTS CẦN: 30+ ảnh

Chụp **tối thiểu 20 ảnh** (khuyến khích 25+ ảnh) để chứng minh tất cả tính năng hoạt động.

---

---

## 📋 PHẦN 1: REFRESH TOKEN & SESSION MANAGEMENT (6 ảnh)

## 📋 CHECKLIST 20+ SCREENSHOTS

### 1.1. Postman Test `/auth/refresh`

### 🗄️ **PHẦN 1: MONGODB ATLAS (3 ảnh)****Cách chụp:**

1. Mở Postman

#### Screenshot #1: MongoDB Atlas Dashboard2. POST `http://localhost:3000/api/auth/refresh`

**Nội dung:**3. Body → raw → JSON:

- ✅ Cluster Overview (Cluster0)   ```json

- ✅ Database: `groupDB`   {

- ✅ Collections: users, refreshtokens, activitylogs     "refreshToken": "YOUR_REFRESH_TOKEN_HERE"

- ✅ Status: Connected   }

   ```

**Cách chụp:**4. Send → Chụp response có `accessToken` mới

1. Đăng nhập: https://cloud.mongodb.com/

2. Click vào Cluster0**✅ Chụp:** Response thành công với access token mới

3. Chụp toàn màn hình Dashboard

### 1.2. Frontend Auto Refresh Token

**Lưu ý:** Đảm bảo thấy rõ tên database và số lượng documents**Cách chụp:**

1. Login vào frontend

---2. Mở Developer Tools (F12) → Network tab

3. Đợi 15 phút (hoặc manually expire token)

#### Screenshot #2: Users Collection - Browse Documents4. Click vào Profile để trigger request

**Nội dung:**5. Chụp Network tab showing `/auth/refresh` tự động được gọi

- ✅ Collections → users

- ✅ Danh sách users (admin, user, moderator)**✅ Chụp:** Network tab với request `/auth/refresh` auto-called

- ✅ Fields: name, email, password (hashed), role, avatar

### 1.3. Redux DevTools

**Cách chụp:****Cách chụp:**

1. Database → Browse Collections1. Cài Redux DevTools extension

2. Click collection `users`2. Login vào frontend

3. Chụp màn hình với ít nhất 3-5 users hiển thị3. F12 → Redux tab

4. Chụp state tree: `auth.accessToken`, `auth.refreshToken`, `auth.user`

**Lưu ý:** Che mật khẩu hash nếu cần (hoặc để nguyên vì đã hash)

**✅ Chụp:** Redux state với tokens

---

### 1.4-1.6. GitHub PR Screenshots

#### Screenshot #3: Activity Logs Collection- [ ] Screenshot GitHub branch `feature/refresh-token`

**Nội dung:**- [ ] Screenshot Pull Request created

- ✅ Collections → activitylogs- [ ] Screenshot Pull Request merged vào main

- ✅ Logs với các action: login, create_user, update_user, delete_user

- ✅ Fields: userId, action, details, timestamp, ipAddress---



**Cách chụp:**## 📋 PHẦN 2: ADVANCED RBAC (5 ảnh)

1. Collections → activitylogs

2. Scroll để thấy nhiều logs### 2.1. Postman 403 Forbidden

3. Chụp màn hình**Cách chụp:**

1. Login với user thường (john@example.com)

**Bonus:** Nếu có thể, chụp thêm ảnh RefreshTokens collection2. Copy accessToken của John

3. Postman → GET `http://localhost:3000/api/admin/users`

---4. Headers: `Authorization: Bearer {John's token}`

5. Chụp response 403 Forbidden

### 🔧 **PHẦN 2: BACKEND - POSTMAN/TERMINAL (4 ảnh)**

**✅ Chụp:** 403 error message "Không có quyền truy cập"

#### Screenshot #4: Backend Terminal Running

**Nội dung:**### 2.2. Admin Dashboard Full Access

- ✅ Terminal output: `npm start`**Cách chụp:**

- ✅ ✅ MongoDB connected1. Login với admin@example.com

- ✅ 🚀 Server running on port 30002. Vào `/admin`

- ✅ 🔌 Socket.IO ready for connections3. Chụp giao diện admin dashboard với stats + user list + logs



**Cách chụp:****✅ Chụp:** Admin dashboard đầy đủ

1. Chạy backend: `npm start` hoặc `start-backend.bat`

2. Chụp terminal khi đã start thành công### 2.3. User Dashboard Restricted

3. Đảm bảo thấy rõ các dòng success**Cách chụp:**

1. Login với john@example.com

---2. Thử vào `/admin` → Bị redirect về `/profile`

3. Chụp URL bar showing `/profile` (không vào được `/admin`)

#### Screenshot #5: Postman - POST /api/auth/login (Success)

**Nội dung:****✅ Chụp:** User không vào được admin page

- ✅ Request: POST http://localhost:3000/api/auth/login

- ✅ Body: ### 2.4-2.5. GitHub PR Screenshots

  ```json- [ ] Screenshot GitHub branch `feature/rbac`

  {- [ ] Screenshot PR merged

    "email": "admin@example.com",

    "password": "admin123"---

  }

  ```## 📋 PHẦN 3: UPLOAD AVATAR (7 ảnh)

- ✅ Response: 200 OK

- ✅ Response body chứa:### 3.1. Cloudinary Dashboard

  - `accessToken`**Cách chụp:**

  - `refreshToken`1. https://cloudinary.com/console

  - `user` object (name, email, role)2. Chụp màn hình showing:

   - Cloud name

**Cách chụp:**   - API Key (visible)

1. Mở Postman (hoặc Thunder Client trong VSCode)   - API Secret (che đi hoặc show)

2. POST → http://localhost:3000/api/auth/login

3. Body → raw → JSON**✅ Chụp:** Dashboard với credentials

4. Send

5. Chụp toàn màn hình (request + response)### 3.2. File `.env` Backend

**Cách chụp:**

---1. Mở `backend/.env`

2. Chụp phần Cloudinary config:

#### Screenshot #6: Postman - GET /api/users (With Auth)   ```

**Nội dung:**   CLOUDINARY_CLOUD_NAME=dxxxxxx

- ✅ Request: GET http://localhost:3000/api/users   CLOUDINARY_API_KEY=12345...

- ✅ Headers:    CLOUDINARY_API_SECRET=********* (che đi)

  - Key: `Authorization`   ```

  - Value: `Bearer <accessToken từ login>`

- ✅ Response: 200 OK**✅ Chụp:** .env với Cloudinary config (CHE API_SECRET!)

- ✅ Response body: Array of users

### 3.3. Frontend Choose File Dialog

**Cách chụp:****Cách chụp:**

1. Copy `accessToken` từ login response1. Login → Profile

2. GET → http://localhost:3000/api/users2. Click "Choose File" ở Upload Avatar section

3. Headers tab → Add `Authorization: Bearer <token>`3. Chụp file picker dialog đang mở

4. Send

5. Chụp màn hình (phải thấy Headers tab và Response)**✅ Chụp:** File picker dialog



---### 3.4. Frontend Upload Success

**Cách chụp:**

#### Screenshot #7: Postman - Error 403 Forbidden (User không có quyền)1. Chọn ảnh → Click "Upload Avatar"

**Nội dung:**2. Chụp alert "✅ Upload avatar thành công!"

- ✅ Login user thường (user@example.com)3. Avatar mới hiển thị trong user card

- ✅ Thử DELETE /api/users/:id

- ✅ Response: 403 Forbidden**✅ Chụp:** Avatar mới hiển thị + success message

- ✅ Message: "Access denied. Admins only"

### 3.5. Cloudinary Media Library

**Cách chụp:****Cách chụp:**

1. Login với user@example.com / user1231. https://cloudinary.com/console/media_library

2. Copy accessToken2. Vào folder `avatars/`

3. DELETE → http://localhost:3000/api/users/[any_user_id]3. Chụp list ảnh đã upload

4. Headers: Authorization Bearer <user_token>

5. Send → Thấy 403 error**✅ Chụp:** Media Library với folder avatars/

6. Chụp màn hình

### 3.6. Cloudinary Image Detail

---**Cách chụp:**

1. Click vào 1 ảnh trong avatars/

### 🔐 **PHẦN 3: FRONTEND - AUTHENTICATION (4 ảnh)**2. Chụp chi tiết ảnh:

   - Dimensions: 500x500

#### Screenshot #8: Login Page   - Format: WebP

**Nội dung:**   - Transformations applied

- ✅ URL: http://localhost:3001/login

- ✅ Form: Email, Password**✅ Chụp:** Image detail page

- ✅ Button: "Đăng nhập"

- ✅ Link: "Quên mật khẩu?"### 3.7. Postman Upload Avatar

- ✅ Demo accounts hiển thị**Cách chụp:**

1. POST `http://localhost:3000/api/profile/avatar`

**Cách chụp:**2. Headers: `Authorization: Bearer {token}`

1. Mở browser → http://localhost:30013. Body → form-data:

2. Tự động redirect về /login   - Key: `avatar` (type: File)

3. Chụp toàn màn hình login page   - Value: Chọn ảnh

4. Đảm bảo UI đẹp, form rõ ràng4. Send → Chụp response



---**✅ Chụp:** Postman upload success response



#### Screenshot #9: Login Success with Toast Notification---

**Nội dung:**

- ✅ Login thành công## 📋 PHẦN 4: FORGOT PASSWORD & EMAIL (8 ảnh)

- ✅ Toast notification: "Chào mừng Admin! 🎉"

- ✅ Đang redirect về /admin hoặc /profile### 4.1. Google 2-Step Verification Enabled

- ✅ Loading state (nếu có)**Cách chụp:**

1. https://myaccount.google.com/security

**Cách chụp:**2. Scroll xuống "2-Step Verification"

1. Nhập admin@example.com / admin1233. Chụp status "On"

2. Click "Đăng nhập"

3. **NHANH TAY** chụp màn hình ngay khi toast hiện ra**✅ Chụp:** 2FA enabled

4. Hoặc dùng Screen Recording → chụp frame từ video

### 4.2. App Passwords Page

**Trick:** Set delay trong code hoặc dùng DevTools throttling**Cách chụp:**

1. Security → 2-Step Verification → App passwords

---2. Chụp danh sách app passwords (có "Group17 NodeJS")



#### Screenshot #10: Profile Page - User Info**✅ Chụp:** App passwords list

**Nội dung:**

- ✅ URL: http://localhost:3001/profile### 4.3. File `.env` Gmail Config

- ✅ User avatar (nếu có)**Cách chụp:**

- ✅ Thông tin: Name, Email, Role1. Mở `backend/.env`

- ✅ Button: Edit Profile, Change Password, Logout2. Chụp:

- ✅ Ngày tạo tài khoản   ```

   GMAIL_USER=your@gmail.com

**Cách chụp:**   GMAIL_APP_PASSWORD=********* (che đi)

1. Login thành công   ```

2. Click "👤 Profile" hoặc vào /profile

3. Chụp toàn trang Profile**✅ Chụp:** .env với Gmail config (CHE APP_PASSWORD!)



---### 4.4. Frontend Forgot Password Form

**Cách chụp:**

#### Screenshot #11: Logout → Redirect to Login1. Vào `/forgot-password`

**Nội dung:**2. Chụp form nhập email

- ✅ Click "Logout"

- ✅ Toast: "Đã đăng xuất"**✅ Chụp:** Forgot password form

- ✅ Redirect về /login

- ✅ localStorage cleared (mở DevTools → Application → localStorage)### 4.5. Email Inbox

**Cách chụp:**

**Cách chụp:**1. Sau khi submit forgot password

1. Mở DevTools (F12) → Application tab → Local Storage2. Mở Gmail inbox

2. Thấy `accessToken` và `refreshToken`3. Chụp email "🔒 Yêu cầu reset mật khẩu" trong inbox

3. Click Logout

4. Chụp màn hình: localStorage trống + ở trang /login**✅ Chụp:** Email received in inbox



---### 4.6. Email Content

**Cách chụp:**

### 📊 **PHẦN 4: FRONTEND - CRUD USERS (4 ảnh)**1. Mở email reset password

2. Chụp toàn bộ nội dung email (header, button, link)

#### Screenshot #12: Dashboard - User List

**Nội dung:****✅ Chụp:** Email content với reset link

- ✅ URL: http://localhost:3001/dashboard hoặc /admin

- ✅ Table: List of users (Name, Email, Role, Actions)### 4.7. Frontend Reset Password Form

- ✅ Button: Add User**Cách chụp:**

- ✅ Pagination (nếu có)1. Click link trong email → Mở `/reset-password/TOKEN`

- ✅ Search bar (nếu có)2. Chụp form nhập password mới



**Cách chụp:****✅ Chụp:** Reset password form

1. Login admin

2. Vào Dashboard/Admin Panel### 4.8. Postman Forgot Password

3. Chụp toàn trang với user list**Cách chụp:**

1. POST `http://localhost:3000/api/auth/forgot-password`

---2. Body: `{ "email": "john@example.com" }`

3. Chụp response success

#### Screenshot #13: Add User Form

**Nội dung:****✅ Chụp:** Postman response

- ✅ Modal/Form: "Thêm User Mới"

- ✅ Fields: Name, Email, Password, Role (select dropdown)---

- ✅ Button: Submit

- ✅ Validation messages (nếu có)## 📋 PHẦN 5: LOGGING & RATE LIMITING (5 ảnh)



**Cách chụp:**### 5.1. Admin Logs Page

1. Click "Add User" button**Cách chụp:**

2. Form hiện ra1. Login admin → `/admin`

3. Chụp màn hình (chưa submit)2. Scroll xuống "Activity Logs"

3. Chụp danh sách logs với action, user, timestamp

**Bonus:** Chụp thêm 1 ảnh sau khi submit thành công (toast "User created")

**✅ Chụp:** Activity logs list

---

### 5.2. MongoDB Compass - ActivityLogs Collection

#### Screenshot #14: Edit User Modal**Cách chụp:**

**Nội dung:**1. Cài MongoDB Compass

- ✅ Modal: "Chỉnh sửa User"2. Connect với MONGODB_URI từ `.env`

- ✅ Fields: Name, Email, Role (pre-filled với data hiện tại)3. Vào database `groupDB` → Collection `activitylogs`

- ✅ Button: Save, Cancel4. Chụp documents trong collection

- ✅ User info hiển thị đúng

**✅ Chụp:** MongoDB activitylogs documents

**Cách chụp:**

1. Click "Edit" icon trên 1 user### 5.3. Postman Rate Limit Test

2. Modal hiện ra với data**Cách chụp:**

3. Chụp màn hình1. POST `http://localhost:3000/api/auth/login`

2. Body: Email/password SAI

---3. Send 6 lần liên tiếp

4. Lần thứ 6 sẽ bị 429 Too Many Requests

#### Screenshot #15: Delete User Confirmation5. Chụp response "Quá nhiều lần đăng nhập thất bại..."

**Nội dung:**

- ✅ Confirmation dialog: "Bạn có chắc muốn xóa user này?"**✅ Chụp:** 429 Rate limit exceeded

- ✅ User info: Name, Email

- ✅ Button: Xóa (red), Hủy### 5.4. Terminal Backend Logs

- ✅ Warning message**Cách chụp:**

1. Terminal đang chạy `node server.js`

**Cách chụp:**2. Sau khi test rate limit, chụp console logs showing rate limit triggered

1. Click "Delete" icon trên 1 user

2. Confirmation dialog hiện ra**✅ Chụp:** Backend console logs

3. Chụp màn hình (CHƯA click Xóa)

### 5.5. GitHub PR

**Bonus:** Chụp thêm 1 ảnh sau khi xóa thành công (toast "User deleted")- [ ] Screenshot PR `feature/log-rate-limit` merged



------



### 🚀 **PHẦN 5: ADVANCED FEATURES (6 ảnh)**## 📋 PHẦN 6: REDUX & PROTECTED ROUTES (4 ảnh)



#### Screenshot #16: Redux DevTools - Auth State### 6.1. Redux DevTools State Tree

**Nội dung:****Cách chụp:**

- ✅ Browser: Chrome/Edge với Redux DevTools extension1. Login → F12 → Redux tab

- ✅ Redux tab: State tree2. Expand `auth` state

- ✅ `auth` state:3. Chụp showing: `user`, `accessToken`, `refreshToken`, `isAuthenticated`

  ```javascript

  {**✅ Chụp:** Redux state tree

    user: { name, email, role },

    accessToken: "eyJhbG...",### 6.2. Protected Route Redirect

    refreshToken: "eyJhbG...",**Cách chụp:**

    isAuthenticated: true,1. Logout (hoặc xóa tokens trong localStorage)

    isLoading: false,2. Thử vào `/profile` directly

    error: null3. Bị redirect về `/login`

  }4. Chụp URL bar showing `/login`

  ```

**✅ Chụp:** Redirect to login when not authenticated

**Cách chụp:**

1. Install Redux DevTools extension### 6.3. Admin Route Protection

2. F12 → Redux tab**Cách chụp:**

3. Click "State" → Expand `auth`1. Login với user thường (john@example.com)

4. Chụp màn hình2. Thử vào `/admin`

3. Bị redirect về `/profile`

---4. Chụp URL bar



#### Screenshot #17: Activity Logs Page (Admin)**✅ Chụp:** User cannot access admin page

**Nội dung:**

- ✅ URL: http://localhost:3001/logs hoặc trong Admin Panel### 6.4. GitHub PR

- ✅ Table: userId, action, details, timestamp, status- [ ] Screenshot PR `feature/redux-protected` merged

- ✅ Filters: By user, by action, by date range

- ✅ Actions: login, create_user, update_user, delete_user---



**Cách chụp:**## 📋 PHẦN 7: TỔNG HỢP & GIT (5+ ảnh)

1. Login admin

2. Vào Activity Logs page### 7.1. GitHub Repo Overview

3. Chụp toàn trang với logs**Cách chụp:**

1. https://github.com/huunhanvo/group-17--project

---2. Chụp repo homepage với:

   - Số commits

#### Screenshot #18: Socket.IO - Online Users Count   - Branches

**Nội dung:**   - README.md preview

- ✅ Header/Navbar: "👥 2 users online"

- ✅ Browser console (F12): **✅ Chụp:** Repo homepage

  ```

  ✅ Socket.IO connected### 7.2. GitHub Branches List

  Socket ID: abc123...**Cách chụp:**

  ```1. Click "Branches" dropdown hoặc vào tab Branches

- ✅ Network tab: WebSocket connection2. Chụp list showing:

   - main

**Cách chụp:**   - feature/refresh-token

1. Mở 2 browsers (hoặc 1 browser + 1 incognito)   - feature/rbac

2. Login 2 users khác nhau   - feature/avatar-upload

3. Thấy "2 users online" trong header   - feature/forgot-password

4. F12 → Console → Thấy Socket.IO logs   - feature/log-rate-limit

5. Chụp màn hình   - feature/redux-protected



**Bonus:** Chụp admin broadcast message toast**✅ Chụp:** Branches list (all 6 feature branches)



---### 7.3. Pull Requests Merged

**Cách chụp:**

#### Screenshot #19: Upload Avatar - Cloudinary Success1. Vào tab "Pull requests"

**Nội dung:**2. Filter: Closed

- ✅ Profile page: Avatar upload dialog3. Chụp list showing all 6 PRs đã merged

- ✅ File selected: image.jpg

- ✅ Upload progress (nếu có)**✅ Chụp:** Closed PRs list

- ✅ Success: Avatar hiển thị trong Profile

- ✅ Cloudinary URL trong response### 7.4. Commit History

**Cách chụp:**

**Cách chụp:**1. Vào tab "Commits"

1. Profile → Upload Avatar2. Chụp commit history với commit messages rõ ràng

2. Chọn ảnh → Upload

3. Chụp màn hình khi avatar đã hiển thị**✅ Chụp:** Commit history

4. Hoặc chụp Network tab → Response từ /api/avatar/upload

### 7.5. README.md

---**Cách chụp:**

1. Scroll xuống homepage

#### Screenshot #20: Cloudinary Dashboard - Media Library2. Chụp README.md rendered với:

**Nội dung:**   - Badges (nếu có)

- ✅ Cloudinary Dashboard: https://cloudinary.com   - Table of contents

- ✅ Media Library → Folder: `avatars/`   - Features list

- ✅ Uploaded images hiển thị   - Installation guide

- ✅ Image details: URL, size, format

**✅ Chụp:** README preview

**Cách chụp:**

1. Login Cloudinary---

2. Media Library

3. Click folder `avatars`## 📋 PHẦN 8: DEMO FLOW SCREENSHOTS (10+ ảnh)

4. Chụp màn hình với uploaded images

### 8.1. Signup Flow

---- [ ] Form đăng ký (empty)

- [ ] Form đăng ký (filled)

#### Screenshot #21: Gmail - Password Reset Email Received- [ ] Success alert "Đăng ký thành công!"

**Nội dung:**

- ✅ Gmail inbox### 8.2. Login Flow

- ✅ Email từ: "Group 17 Project" hoặc `EMAIL_USER`- [ ] Form login

- ✅ Subject: "Password Reset Request" hoặc tương tự- [ ] Sau login → redirect sang Profile

- ✅ Email body: Reset link button- [ ] localStorage showing tokens (F12 → Application → Local Storage)



**Cách chụp:**### 8.3. Profile Management

1. Frontend: Forgot Password → Nhập email- [ ] Profile page (view mode)

2. Check Gmail inbox- [ ] Profile page (edit mode)

3. Thấy email mới- [ ] After update success message

4. Chụp màn hình

### 8.4. Admin Dashboard

**Bonus:** Click vào email → Chụp full nội dung email- [ ] Stats cards (total users, active, admins, logins)

- [ ] User management list

---- [ ] Activity logs section



#### Screenshot #22: Password Reset Success Page### 8.5. Avatar Upload

**Nội dung:**- [ ] Before upload (default avatar)

- ✅ URL: http://localhost:3001/reset-password/:token- [ ] After upload (custom avatar 500x500)

- ✅ Form: New Password, Confirm Password

- ✅ Submit → Toast: "Mật khẩu đã được đổi thành công"### 8.6. Forgot Password

- ✅ Redirect về /login- [ ] Forgot password form

- [ ] Email received

**Cách chụp:**- [ ] Reset password form

1. Click link trong email- [ ] Success message after reset

2. Nhập password mới

3. Submit---

4. Chụp màn hình khi thấy success message

## 🎥 VIDEO DEMO (1 VIDEO - 3-5 PHÚT)

---

### Nội Dung Video:

### 🎁 **BONUS SCREENSHOTS (Optional - Thêm điểm)**1. **Intro (10s)**: Giới thiệu dự án

2. **Signup (20s)**: Tạo tài khoản mới

#### Screenshot #23: RBAC - Admin Panel (Full Access)3. **Login (20s)**: Đăng nhập admin

- ✅ Login admin → Thấy "👑 Admin Panel"4. **Profile (30s)**: Xem, sửa profile, upload avatar

- ✅ Dashboard: Stats (Total Users, Today's Logins, etc.)5. **UserList (20s)**: Xem danh sách users

- ✅ Buttons: Manage Users, View Logs, Settings6. **Admin Dashboard (40s)**:

   - Stats overview

#### Screenshot #24: RBAC - User Panel (Limited Access)   - User management (xóa user)

- ✅ Login user thường   - Activity logs

- ✅ Không thấy Admin Panel7. **Forgot Password (40s)**:

- ✅ Chỉ thấy Profile, My Activities   - Submit email

   - Show inbox email

#### Screenshot #25: Network Tab - Auto Token Refresh   - Click link reset

- ✅ F12 → Network tab   - Đổi password mới

- ✅ Gọi API protected route8. **RBAC Demo (30s)**:

- ✅ Thấy request: POST /api/auth/refresh   - Logout admin

- ✅ Response: New accessToken   - Login user thường

   - Thử vào `/admin` → bị chặn

#### Screenshot #26: Forgot Password Page9. **Postman Demo (30s)**: Test vài API endpoints

- ✅ URL: /forgot-password10. **Outro (10s)**: Tổng kết

- ✅ Form: Email input

- ✅ Button: "Gửi email reset"### Tools Quay Video:

- **OBS Studio** (free): https://obsproject.com

#### Screenshot #27: Signup Page- **ScreenToGif** (free): https://www.screentogif.com

- ✅ URL: /signup- **Loom** (free): https://loom.com

- ✅ Form: Name, Email, Password, Confirm Password

- ✅ Button: "Đăng ký"### Tips Quay Video:

- ✅ Quay màn hình full HD (1920x1080)

---- ✅ Giữ framerate 30fps

- ✅ Zoom in các phần quan trọng

## 📝 **GỢI Ý TỔ CHỨC SCREENSHOTS**- ✅ Nói chậm, rõ ràng (hoặc thêm subtitle)

- ✅ Cắt các phần chờ đợi (loading)

### Cách đặt tên file:- ✅ Export video dạng MP4

```

01_MongoDB_Dashboard.png---

02_MongoDB_Users_Collection.png

03_MongoDB_ActivityLogs.png## 📊 CHECKLIST TỔNG HỢP

04_Backend_Terminal_Running.png

05_Postman_Login_Success.png### Buổi 4 - CRUD cơ bản:

06_Postman_Get_Users.png- [ ] MongoDB Atlas dashboard

07_Postman_Error_403.png- [ ] Backend running (terminal)

08_Frontend_Login_Page.png- [ ] Postman GET/POST/PUT/DELETE users

09_Frontend_Login_Success_Toast.png- [ ] Frontend UserList

10_Frontend_Profile_Page.png

11_Frontend_Logout.png### Buổi 5 - Authentication:

12_Frontend_Dashboard_UserList.png- [ ] Signup form + success

13_Frontend_Add_User_Form.png- [ ] Login form + JWT tokens

14_Frontend_Edit_User.png- [ ] Profile view + edit

15_Frontend_Delete_Confirmation.png- [ ] Postman auth APIs

16_Redux_DevTools_State.png

17_Activity_Logs_Page.png### Buổi 6 - Advanced:

18_SocketIO_Online_Users.png- [ ] Refresh token (6 ảnh)

19_Upload_Avatar_Success.png- [ ] RBAC (5 ảnh)

20_Cloudinary_Dashboard.png- [ ] Avatar upload (7 ảnh)

21_Gmail_Reset_Email.png- [ ] Forgot password (8 ảnh)

22_Password_Reset_Success.png- [ ] Logging & rate limit (5 ảnh)

23_BONUS_Admin_Panel.png- [ ] Redux & protected routes (4 ảnh)

24_BONUS_User_Panel.png- [ ] GitHub (5 ảnh)

25_BONUS_Token_Refresh_Network.png- [ ] Demo screenshots (10 ảnh)

```- [ ] Video demo (1 video)



---**TỔNG CỘNG: 50+ screenshots + 1 video**



## 🎨 **TIPS CHỤP ẢNH ĐẸP**---



### 1. Độ phân giải:## 💡 LƯU Ý QUAN TRỌNG

- ✅ Chụp Full HD (1920x1080) trở lên

- ✅ Không chụp mờ, không bị cắt### Khi Chụp Ảnh:

1. ✅ Chụp full màn hình (không crop quá nhỏ)

### 2. Browser:2. ✅ Độ phân giải cao (ít nhất 1920x1080)

- ✅ Zoom 100% (Ctrl+0)3. ✅ Đặt tên file rõ ràng: `01-mongodb-atlas-dashboard.png`

- ✅ Ẩn bookmarks bar (Ctrl+Shift+B)4. ✅ Che thông tin nhạy cảm:

- ✅ F11 fullscreen mode (optional)   - API Secrets

   - Passwords

### 3. Tools:   - Email addresses (nếu cần)

- ✅ Windows: Snipping Tool (Win+Shift+S)5. ✅ Highlight phần quan trọng (dùng arrow/box màu đỏ)

- ✅ Chrome: DevTools Screenshot (Ctrl+Shift+P → "Capture screenshot")

- ✅ Extension: Awesome Screenshot### Công Cụ Chụp Ảnh:

- **Windows**: Snipping Tool (Win + Shift + S)

### 4. Annotations (Optional):- **Mac**: Command + Shift + 4

- ✅ Dùng arrow, box để highlight phần quan trọng- **Extension**: Awesome Screenshot (Chrome)

- ✅ Add text: "Success", "Error 403", "2 users online"

### Công Cụ Annotate (vẽ mũi tên, highlight):

---- **Windows**: Snagit, Greenshot

- **Mac**: Skitch

## ✅ **CHECKLIST CUỐI CÙNG**- **Online**: https://www.photopea.com



Trước khi nộp, đảm bảo:---

- [ ] Đủ 20+ ảnh (khuyến khích 25+)

- [ ] Tất cả ảnh rõ nét, không mờ✅ **BẮT ĐẦU CHỤP ẢNH THEO THỨ TỰ TỪ TRÊN XUỐNG!**

- [ ] File name có số thứ tự và mô tả

- [ ] Ảnh không chứa thông tin nhạy cảm (JWT token full, password, API keys)Mỗi ảnh chụp xong → Đánh dấu ✅ vào checklist!

- [ ] Tất cả tính năng đều có ảnh minh chứng
- [ ] Ảnh được upload lên Google Drive hoặc GitHub (nếu yêu cầu)

---

## 📦 **NỘP BÀI**

### Tạo Google Drive folder:
```
Group-17-Screenshots/
├── 01_MongoDB_Dashboard.png
├── 02_MongoDB_Users_Collection.png
├── ...
├── 20_Cloudinary_Dashboard.png
├── 21_Gmail_Reset_Email.png
└── README.txt (Link backend + frontend + MongoDB)
```

### Hoặc GitHub:
```
group-17--project/
└── screenshots/
    ├── 01_MongoDB_Dashboard.png
    ├── 02_MongoDB_Users_Collection.png
    └── ...
```

---

## 🎯 **PRIORITY ORDER (Nếu thiếu thời gian)**

**BẮT BUỘC (Top 15):**
1. MongoDB Dashboard
2. Users Collection
3. Backend Terminal Running
4. Postman Login Success
5. Postman Get Users (Auth)
6. Login Page
7. Profile Page
8. Dashboard User List
9. Add User Form
10. Edit User
11. Delete Confirmation
12. Redux DevTools
13. Activity Logs
14. Upload Avatar
15. Cloudinary Dashboard

**NÊN CÓ (Next 5):**
16. Postman Error 403
17. Socket.IO Online Users
18. Gmail Reset Email
19. Password Reset Success
20. Login Success Toast

**BONUS (If time permits):**
21. Admin Panel (RBAC)
22. User Panel (RBAC)
23. Token Refresh Network
24. Forgot Password Page
25. Signup Page

---

## 🚀 **BẮT ĐẦU CHỤP NGAY!**

**Estimated time: 25-30 phút**

**Pro tip:** Mở checklist này trên 1 màn hình, chụp ảnh trên màn hình khác để không bị nhầm lẫn! 📸✨
