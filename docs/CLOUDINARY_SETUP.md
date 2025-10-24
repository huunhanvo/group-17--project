# 📦 Hướng Dẫn Lấy Cloudinary Credentials

## 🎯 Mục Đích
Cloudinary là dịch vụ lưu trữ và xử lý ảnh trên cloud. Chúng ta sử dụng nó cho Activity 3: Avatar Upload.

---

## 📝 Bước 1: Đăng Ký Tài Khoản Cloudinary

### 1.1. Truy cập trang đăng ký
Mở trình duyệt và truy cập: **https://cloudinary.com/users/register/free**

### 1.2. Điền thông tin đăng ký
Bạn có 2 cách:

**Cách 1: Đăng ký bằng Email**
- **Email:** Nhập email của bạn
- **Password:** Tạo password (ít nhất 8 ký tự)
- **Cloud Name:** Tên duy nhất cho cloud của bạn (VD: `group17-project`)
  - ⚠️ **Lưu ý:** Cloud name này sẽ dùng cho `CLOUDINARY_CLOUD_NAME`
- Click **SIGN UP FOR FREE**

**Cách 2: Đăng ký bằng Google/GitHub** (Khuyến nghị - Nhanh hơn)
- Click nút **Sign up with Google** hoặc **Sign up with GitHub**
- Chọn tài khoản của bạn
- Cloud name sẽ được tạo tự động

### 1.3. Xác thực email
- Mở email đăng ký
- Click link xác thực trong email từ Cloudinary
- Quay lại trang đăng nhập

---

## 📊 Bước 2: Lấy Credentials từ Dashboard

### 2.1. Đăng nhập vào Dashboard
- Truy cập: **https://cloudinary.com/console**
- Đăng nhập với tài khoản vừa tạo

### 2.2. Xem Dashboard
Sau khi đăng nhập, bạn sẽ thấy trang **Dashboard** với các thông tin:

```
┌─────────────────────────────────────────────────────┐
│  Product Environment Credentials                     │
│                                                      │
│  Cloud name:    dxxxxxxxxxxxxxx                      │ ← Copy này
│  API Key:       123456789012345                      │ ← Copy này
│  API Secret:    ●●●●●●●●●●●●●●● [Show] [Copy]       │ ← Click Show rồi Copy
└─────────────────────────────────────────────────────┘
```

### 2.3. Copy các thông tin quan trọng

**Cloud Name:**
- Hiển thị ngay, có thể copy trực tiếp
- VD: `dxxxxxxxxxxxxxx` hoặc `group17-project`

**API Key:**
- Dãy số 15 chữ số
- VD: `123456789012345`

**API Secret:**
- Click nút **[Show]** bên cạnh để hiện
- Click nút **[Copy]** để copy
- VD: `abcdefghijklmnopqrstuvwxyz-12345`

### 2.4. Lưu thông tin
Tạo file text tạm để lưu:

```
CLOUDINARY_CLOUD_NAME=dxxxxxxxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz-12345
```

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
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Thay bằng:
```env
CLOUDINARY_CLOUD_NAME=dxxxxxxxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz-12345
```

### 3.3. Lưu file
- Nhấn `Ctrl + S` để lưu
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
Nếu thành công, không có lỗi "Cloudinary" trong console.

---

## ✅ Bước 5: Test Upload Avatar

### 5.1. Truy cập Frontend
Mở trình duyệt: **http://localhost:3001**

### 5.2. Login
```
Email: admin@example.com
Password: admin123
```

### 5.3. Upload Avatar
1. Click vào **Profile** hoặc **Edit User**
2. Click **Choose File**
3. Chọn ảnh từ máy tính (JPG, PNG, GIF - max 5MB)
4. Click **Upload Avatar**
5. Đợi vài giây
6. Nếu thành công: Ảnh sẽ hiển thị

### 5.4. Kiểm tra trên Cloudinary Dashboard
1. Quay lại **https://cloudinary.com/console/media_library**
2. Mở folder **avatars/**
3. Bạn sẽ thấy ảnh vừa upload (đã resize 500x500, format WebP)

---

## 🎨 Bước 6: Cấu Hình Nâng Cao (Optional)

### 6.1. Tạo Upload Preset (Không bắt buộc)
Nếu muốn cấu hình upload settings:

1. Vào **Settings** → **Upload**
2. Scroll xuống **Upload presets**
3. Click **Add upload preset**
4. Đặt tên: `user-avatars`
5. **Folder:** `avatars`
6. **Delivery type:** `upload`
7. **Access mode:** `public`
8. Click **Save**

### 6.2. Cấu Hình Transformation
Trong code đã có sẵn Sharp resize, nhưng có thể dùng Cloudinary transformation:

```javascript
// backend/config/cloudinary.js
// Có thể thêm eager transformation
{
  eager: [
    { width: 500, height: 500, crop: "fill" }
  ]
}
```

---

## 🐛 Troubleshooting

### Lỗi: "Invalid API Key"
```
Nguyên nhân: API Key sai
Giải pháp:
1. Kiểm tra lại CLOUDINARY_API_KEY trong .env
2. Đảm bảo không có khoảng trắng thừa
3. Copy lại từ Dashboard
```

### Lỗi: "Invalid Signature"
```
Nguyên nhân: API Secret sai
Giải pháp:
1. Click [Show] trong Dashboard để xem API Secret
2. Copy chính xác
3. Restart backend
```

### Lỗi: "Cloud not found"
```
Nguyên nhân: Cloud Name sai
Giải pháp:
1. Kiểm tra CLOUDINARY_CLOUD_NAME
2. Phải khớp với Cloud name trong Dashboard
```

### Upload thành công nhưng không thấy ảnh
```
Nguyên nhân: URL không trả về đúng
Giải pháp:
1. Check browser console
2. Verify response từ API
3. Check Network tab xem có load được ảnh không
```

---

## 📸 Screenshots Cần Chụp cho Báo Cáo

1. **Cloudinary Dashboard** - Showing Cloud Name, API Key
2. **File .env** - Đã điền credentials (che API Secret)
3. **Frontend** - Choose file dialog
4. **Frontend** - Upload success message
5. **Frontend** - Avatar hiển thị
6. **Cloudinary Media Library** - Folder avatars/ với ảnh đã upload
7. **Cloudinary Image Detail** - Showing transformations (500x500, WebP)

---

## 💡 Tips

### Free Tier Limits
- **Storage:** 25 GB
- **Bandwidth:** 25 GB/tháng
- **Transformations:** 25,000/tháng
- **Images:** Unlimited

→ **Đủ cho project nhỏ và testing!**

### Best Practices
1. ✅ Luôn resize ảnh trước khi upload (đã làm bằng Sharp)
2. ✅ Sử dụng WebP format để giảm dung lượng
3. ✅ Đặt tên file có ý nghĩa (đã dùng userId)
4. ✅ Xóa ảnh cũ khi upload ảnh mới (đã implement)

### Security
- ❌ **KHÔNG BAO GIỜ** commit file `.env` lên Git
- ❌ **KHÔNG BAO GIỜ** share API Secret công khai
- ✅ Chỉ lưu credentials trong `.env`
- ✅ Thêm `.env` vào `.gitignore`

---

## 🔗 Links Hữu Ích

- **Cloudinary Dashboard:** https://cloudinary.com/console
- **Documentation:** https://cloudinary.com/documentation
- **Media Library:** https://cloudinary.com/console/media_library
- **Upload Presets:** https://cloudinary.com/console/settings/upload

---

✅ **Hoàn tất! Bây giờ ứng dụng có thể upload avatar lên Cloudinary!**
