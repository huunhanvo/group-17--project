# 📧 Hướng Dẫn Lấy Gmail App Password

## 🎯 Mục Đích
Gmail App Password cho phép ứng dụng gửi email thay bạn một cách an toàn. Chúng ta dùng nó cho Activity 4: Forgot Password Email.

---

## ⚠️ Điều Kiện Tiên Quyết

### Yêu Cầu Bắt Buộc:
1. ✅ Phải có tài khoản Gmail
2. ✅ Phải bật **2-Step Verification** (Xác minh 2 bước)
3. ✅ Không dùng Gmail của trường/công ty (phải là Gmail cá nhân)

**⚠️ LƯU Ý QUAN TRỌNG:**
- **KHÔNG thể** dùng password Gmail thường
- **PHẢI** dùng App Password (16 ký tự đặc biệt)
- Gmail trường/công ty thường **KHÔNG cho phép** tạo App Password

---

## 🔐 Bước 1: Bật 2-Step Verification

### 1.1. Truy cập Google Account Security
Mở trình duyệt và truy cập: **https://myaccount.google.com/security**

### 1.2. Tìm mục "2-Step Verification"
Scroll xuống tìm phần:
```
┌──────────────────────────────────────────┐
│  How you sign in to Google               │
│                                          │
│  2-Step Verification                     │
│  Add an extra layer of security          │
│  [Off] or [Get started]                  │
└──────────────────────────────────────────┘
```

### 1.3. Bật 2-Step Verification

**Nếu đang OFF:**
1. Click **[Get started]**
2. Nhập lại password Gmail
3. Nhập số điện thoại để nhận mã xác thực
4. Nhập mã 6 số từ SMS
5. Click **Turn on** để kích hoạt

**Nếu đã ON:**
- ✅ Bỏ qua bước này, chuyển sang Bước 2

### 1.4. Xác nhận đã bật thành công
Sau khi bật, bạn sẽ thấy:
```
2-Step Verification: ON ✅
```

---

## 🔑 Bước 2: Tạo App Password

### 2.1. Truy cập App Passwords
**Cách 1: Link trực tiếp** (Khuyến nghị)
Truy cập: **https://myaccount.google.com/apppasswords**

**Cách 2: Từ Security page**
1. Ở trang Security: https://myaccount.google.com/security
2. Scroll xuống mục **"How you sign in to Google"**
3. Tìm **"2-Step Verification"** → Click vào
4. Scroll xuống dưới cùng
5. Tìm **"App passwords"** → Click vào

### 2.2. Nhập lại password
- Google sẽ yêu cầu nhập lại password để xác thực
- Nhập password Gmail của bạn
- Click **Next**

### 2.3. Tạo App Password mới

Bạn sẽ thấy trang **"App passwords"**:

```
┌────────────────────────────────────────────────┐
│  App passwords                                  │
│                                                │
│  Select the app and device you want to        │
│  generate the app password for.               │
│                                                │
│  Select app:    [Mail ▼]                      │
│  Select device: [Windows Computer ▼]          │
│                                                │
│  [Generate]                                    │
└────────────────────────────────────────────────┘
```

**Chọn thông tin:**
1. **Select app:** Chọn **Mail**
2. **Select device:** Chọn **Windows Computer** (hoặc **Other** → Nhập "NodeJS App")
3. Click **[Generate]**

### 2.4. Copy App Password

Google sẽ hiển thị mật khẩu 16 ký tự:

```
┌────────────────────────────────────────────────┐
│  Your app password for Windows Computer        │
│                                                │
│  abcd efgh ijkl mnop                          │ ← Copy cả dòng này
│                                                │
│  [Done]                                        │
└────────────────────────────────────────────────┘
```

**⚠️ QUAN TRỌNG:**
- Copy **CẢ DÒNG** này (bao gồm cả khoảng trắng)
- VD: `abcd efgh ijkl mnop`
- Chỉ hiện 1 lần duy nhất, sau khi click **[Done]** sẽ không xem lại được
- Nếu quên, phải tạo mới

### 2.5. Lưu App Password
Lưu vào file text tạm:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

**Lưu ý định dạng:**
- Có thể giữ nguyên khoảng trắng: `abcd efgh ijkl mnop`
- Hoặc bỏ khoảng trắng: `abcdefghijklmnop`
- **Cả 2 cách đều hoạt động!**

---

## ⚙️ Bước 3: Cấu Hình vào Project

### 3.1. Mở file .env
```bash
# Mở file này
D:\Class\Class_Phat_Trien_Phan_Mem_Ma_Nguon_Mo\buoi4\group-17--project\backend\.env
```

### 3.2. Thay thế các giá trị
Tìm dòng này:
```env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_16_char_app_password_here
FRONTEND_URL=http://localhost:3001
```

Thay bằng (VD):
```env
EMAIL_USER=huunhanvo@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
FRONTEND_URL=http://localhost:3001
```

**Hoặc bỏ khoảng trắng:**
```env
EMAIL_PASSWORD=abcdefghijklmnop
```

### 3.3. Lưu file
- Nhấn `Ctrl + S`
- **⚠️ QUAN TRỌNG:** Không commit file `.env` lên Git!

---

## 🔄 Bước 4: Restart Backend

### 4.1. Stop backend hiện tại
```bash
# Trong terminal đang chạy backend
# Nhấn: Ctrl + C
```

### 4.2. Start lại backend
```bash
cd D:\Class\Class_Phat_Trien_Phan_Mem_Ma_Nguon_Mo\buoi4\group-17--project\backend
node server.js
```

### 4.3. Kiểm tra console
Nếu thành công, không có lỗi về "Email" trong console.

---

## ✅ Bước 5: Test Gửi Email

### 5.1. Truy cập Frontend
Mở trình duyệt: **http://localhost:3001**

### 5.2. Test Forgot Password
1. Ở trang **Login**, click **"Forgot Password?"**
2. Nhập email: `admin@example.com`
3. Click **"Send Reset Link"**
4. Đợi vài giây

### 5.3. Kiểm tra Console Backend
Xem log trong terminal backend:
```
✉️  Sending reset email to: admin@example.com
✅ Reset password email sent successfully
```

### 5.4. Kiểm tra Email
1. **Mở Gmail của bạn** (EMAIL_USER)
2. Trong **Inbox** hoặc **Spam**, tìm email từ ứng dụng
3. Subject: **"Password Reset Request"**
4. Nội dung có link reset password

**⚠️ LƯU Ý:**
- Email có thể vào **Spam** lần đầu tiên
- Đánh dấu **"Not Spam"** để lần sau vào Inbox

### 5.5. Test Reset Password
1. Click link trong email
2. Hoặc copy token từ email
3. Nhập password mới
4. Click **"Reset Password"**
5. Login với password mới

---

## 🎨 Email Template Hiện Tại

Email sẽ trông như này:

```
Subject: Password Reset Request

Hi there,

You requested to reset your password for your account.

Click the link below to reset your password:
http://localhost:3001/reset-password/abc123xyz456...

This link will expire in 30 minutes.

If you didn't request this, please ignore this email.

Thanks,
User Management Team
```

---

## 🐛 Troubleshooting

### Lỗi: "Invalid login: 535 Authentication failed"
```
Nguyên nhân: App Password sai hoặc chưa tạo
Giải pháp:
1. Kiểm tra EMAIL_PASSWORD trong .env
2. Đảm bảo đã copy đúng 16 ký tự
3. Tạo lại App Password mới
4. Restart backend
```

### Lỗi: "Username and Password not accepted"
```
Nguyên nhân: Chưa bật 2-Step Verification
Giải pháp:
1. Vào https://myaccount.google.com/security
2. Bật 2-Step Verification
3. Tạo lại App Password
```

### Lỗi: "Less secure app access"
```
Nguyên nhân: Đang dùng password thường thay vì App Password
Giải pháp:
❌ KHÔNG bật "Less secure app access" (không an toàn)
✅ PHẢI dùng App Password (16 ký tự)
```

### Email không nhận được
```
Nguyên nhân: Email vào Spam hoặc sai địa chỉ
Giải pháp:
1. Check Spam folder
2. Đợi 1-2 phút (có thể bị delay)
3. Kiểm tra EMAIL_USER trong .env có đúng không
4. Check backend console có lỗi không
```

### Lỗi: "Nodemailer ETIMEDOUT"
```
Nguyên nhân: Firewall chặn port 587 hoặc 465
Giải pháp:
1. Check mạng có block SMTP không
2. Thử đổi port trong config/email.js
3. Nếu dùng mạng trường, thử đổi sang 4G
```

---

## 🔐 Security Best Practices

### ✅ Nên làm:
1. ✅ Dùng App Password thay vì password thường
2. ✅ Bật 2-Step Verification
3. ✅ Lưu App Password trong `.env`
4. ✅ Thêm `.env` vào `.gitignore`
5. ✅ Revoke App Password khi không dùng nữa

### ❌ KHÔNG nên làm:
1. ❌ Share App Password công khai
2. ❌ Commit `.env` lên Git
3. ❌ Dùng password Gmail thường
4. ❌ Bật "Less secure app access"
5. ❌ Dùng Gmail trường/công ty

---

## 🗑️ Bước 6: Xóa App Password (Khi Không Dùng)

### 6.1. Truy cập App Passwords
Vào: **https://myaccount.google.com/apppasswords**

### 6.2. Xem danh sách
Bạn sẽ thấy:
```
┌────────────────────────────────────────┐
│  Windows Computer (Mail)               │
│  Created: Jan 15, 2024                 │
│  [Revoke] [X]                          │
└────────────────────────────────────────┘
```

### 6.3. Revoke
- Click **[X]** hoặc **[Revoke]**
- Xác nhận xóa
- App Password ngay lập tức không còn hoạt động

---

## 📸 Screenshots Cần Chụp cho Báo Cáo

1. **Google Account Security** - 2-Step Verification ON
2. **App Passwords page** - List of created passwords
3. **Generated App Password** - 16 ký tự (che bớt)
4. **File .env** - EMAIL_USER và EMAIL_PASSWORD (che password)
5. **Frontend** - Forgot Password form
6. **Frontend** - Success message "Email sent"
7. **Gmail Inbox** - Email nhận được
8. **Email Content** - Reset link
9. **Frontend** - Reset Password form
10. **Backend Console** - Email sent log

---

## 💡 Tips

### Gmail Limits
- **Gửi tối đa:** 500 emails/ngày (Gmail cá nhân)
- **Rate limit:** Khoảng 100 emails/giờ
→ **Đủ cho testing và demo!**

### Testing
```javascript
// Nếu muốn test không gửi email thật, comment code này
// trong config/email.js:

// const info = await transporter.sendMail(mailOptions);
console.log('EMAIL WOULD BE SENT TO:', email);
console.log('RESET TOKEN:', resetToken);
return true;  // Fake success
```

### Alternative Services
Nếu không dùng được Gmail:
1. **SendGrid** - 100 emails/day miễn phí
2. **Mailgun** - 5000 emails/month đầu miễn phí
3. **Mailtrap** - Chỉ cho testing (không gửi thật)

---

## 🔗 Links Hữu Ích

- **Google Account Security:** https://myaccount.google.com/security
- **App Passwords:** https://myaccount.google.com/apppasswords
- **2-Step Verification:** https://myaccount.google.com/signinoptions/two-step-verification
- **Nodemailer Docs:** https://nodemailer.com/about/

---

✅ **Hoàn tất! Bây giờ ứng dụng có thể gửi email reset password!**
