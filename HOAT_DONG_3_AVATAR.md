# Hoạt Động 3: Upload Avatar với Cloudinary

## ✅ Đã Hoàn Thành

### Backend
- ✅ Cài đặt packages: `multer`, `sharp`, `cloudinary`
- ✅ Tạo config Cloudinary (`backend/config/cloudinary.js`)
- ✅ Tạo middleware upload với Multer + Sharp (`backend/middleware/uploadMiddleware.js`)
- ✅ Thêm controllers: `uploadAvatar()`, `deleteAvatar()` 
- ✅ Tạo routes `/avatar/upload` và `/avatar/delete`
- ✅ Tích hợp vào `server.js`

### Frontend
- ✅ Cập nhật `Profile.jsx` với FormData upload (thay base64)
- ✅ Thêm nút Upload Avatar
- ✅ Thêm nút Delete Avatar
- ✅ Preview ảnh trước khi upload

---

## 🚀 Hướng Dẫn Setup Cloudinary

### Bước 1: Đăng ký tài khoản Cloudinary (MIỄN PHÍ)

1. Truy cập: https://cloudinary.com/users/register_free
2. Điền form đăng ký:
   - Email
   - Password
   - Cloud Name (ví dụ: `myapp-images`)
3. Xác nhận email
4. Đăng nhập vào Dashboard

### Bước 2: Lấy thông tin API

1. Vào Dashboard Cloudinary
2. Sao chép 3 thông tin sau:
   - **Cloud Name**: Tên cloud của bạn
   - **API Key**: Chuỗi số dài
   - **API Secret**: Mã bí mật (click "Reveal" để hiện)

### Bước 3: Cập nhật file `.env` trong backend

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Lưu ý**: Thay `your_cloud_name_here`, `your_api_key_here`, `your_api_secret_here` bằng thông tin thực của bạn.

### Bước 4: Test kết nối Cloudinary

```cmd
cd backend
node test-cloudinary.js
```

**Kết quả mong đợi**:
```
✅ Kết nối Cloudinary thành công!
✅ Upload test image thành công!
URL: https://res.cloudinary.com/...
Public ID: avatars/test_xxxxx
✅ Xóa test image thành công!
```

---

## 📋 Hướng Dẫn Test Chức Năng

### Test 1: Upload Avatar qua Giao Diện

1. **Đăng nhập**: Login với tài khoản bất kỳ
2. **Vào Profile**: Click "Profile" trong menu
3. **Chọn ảnh**: Click nút chọn file → Chọn ảnh (JPG/PNG, max 5MB)
4. **Preview**: Xem ảnh preview hiển thị
5. **Upload**: Click "⬆️ Upload Avatar"
6. **Xác nhận**: Avatar mới hiển thị trong Profile

**Chụp ảnh**:
- Screenshot trước upload (với preview)
- Screenshot sau upload (avatar hiển thị)

### Test 2: Xóa Avatar qua Giao Diện

1. **Vào Profile**: Profile đã có avatar
2. **Click Xóa**: Click nút "🗑️ Xóa Avatar"
3. **Xác nhận**: Confirm dialog → Click OK
4. **Kiểm tra**: Avatar bị xóa, hiển thị icon mặc định

**Chụp ảnh**:
- Screenshot trước xóa
- Screenshot sau xóa

### Test 3: Upload Avatar qua Postman

#### Request 1: Upload Avatar

**Endpoint**: `POST http://localhost:3000/avatar/upload`

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Body** (form-data):
- Key: `avatar` (type: File)
- Value: Chọn file ảnh từ máy

**Response thành công** (200):
```json
{
  "success": true,
  "message": "Upload avatar thành công",
  "avatar": "https://res.cloudinary.com/your-cloud/image/upload/v123/avatars/user_xxx.webp"
}
```

**Chụp ảnh**:
- Screenshot Postman với request upload
- Screenshot response JSON

#### Request 2: Delete Avatar

**Endpoint**: `DELETE http://localhost:3000/avatar/delete`

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response thành công** (200):
```json
{
  "success": true,
  "message": "Đã xóa avatar"
}
```

**Chụp ảnh**:
- Screenshot Postman với request delete
- Screenshot response JSON

### Test 4: Kiểm tra Cloudinary Dashboard

1. Đăng nhập Cloudinary
2. Vào **Media Library**
3. Mở folder **avatars/**
4. Xem ảnh đã upload với định dạng webp, size 500x500

**Chụp ảnh**:
- Screenshot Cloudinary dashboard với ảnh đã upload

---

## 🔍 Chi Tiết Kỹ Thuật

### Backend Flow

1. **Upload Request** → Multer nhận file từ frontend
2. **Memory Storage** → File lưu tạm trong RAM (buffer)
3. **Sharp Resize** → Resize ảnh về 500x500, convert webp
4. **Cloudinary Upload** → Upload buffer lên Cloudinary cloud
5. **Database Update** → Lưu URL vào `user.avatar`
6. **Response** → Trả URL về frontend

### Frontend Flow

1. **User chọn file** → `handleAvatarChange()` tạo preview
2. **Click Upload** → `handleAvatarUpload()` tạo FormData
3. **Axios POST** → Gửi file multipart/form-data
4. **Nhận URL** → Update localStorage và state
5. **Re-render** → Avatar mới hiển thị

### Cloudinary Transformations

```javascript
folder: 'avatars',
resource_type: 'image',
format: 'webp',
width: 500,
height: 500,
crop: 'fill'
```

- **Format**: WebP (giảm 30% dung lượng so với JPG)
- **Size**: 500x500px (responsive, load nhanh)
- **Crop**: Fill (cắt ảnh để vừa khung vuông)

---

## 📝 Checklist Hoàn Thành

- [ ] Đăng ký tài khoản Cloudinary
- [ ] Cập nhật `.env` với API credentials
- [ ] Test kết nối với `test-cloudinary.js`
- [ ] Test upload avatar qua giao diện
- [ ] Test delete avatar qua giao diện
- [ ] Test upload avatar qua Postman
- [ ] Test delete avatar qua Postman
- [ ] Chụp 6 screenshots như hướng dẫn
- [ ] Kiểm tra ảnh trên Cloudinary dashboard
- [ ] Commit code lên Git

---

## 🐛 Troubleshooting

### Lỗi: "Cloudinary credentials missing"
→ Kiểm tra file `.env` đã cập nhật đúng 3 biến `CLOUDINARY_*`

### Lỗi: "File too large"
→ Ảnh upload phải < 5MB. Dùng tool nén ảnh trước.

### Lỗi: "Invalid image format"
→ Chỉ hỗ trợ JPG, PNG, GIF, WEBP. Không upload PDF/video.

### Avatar không hiển thị sau upload
→ Kiểm tra Console log có lỗi CORS. Refresh trang để load lại.

### Ảnh bị xoay sai hướng
→ Sharp tự động xử lý EXIF orientation, không cần fix.

---

## 📚 Tài Liệu Tham Khảo

- Cloudinary Docs: https://cloudinary.com/documentation
- Multer: https://github.com/expressjs/multer
- Sharp: https://sharp.pixelplumbing.com/
- FormData MDN: https://developer.mozilla.org/en-US/docs/Web/API/FormData
