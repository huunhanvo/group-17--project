# 📝 Hướng dẫn cấu hình Cloudinary

## Bước 1: Đăng ký tài khoản Cloudinary

1. Truy cập: https://cloudinary.com/users/register_free
2. Điền thông tin đăng ký (hoặc đăng nhập bằng Google/GitHub)
3. Xác nhận email

## Bước 2: Lấy thông tin API

1. Sau khi đăng nhập, vào Dashboard
2. Trong phần **Account Details**, bạn sẽ thấy:
   - **Cloud Name**: `dxxxxx` (ví dụ: dab1234xy)
   - **API Key**: `123456789012345`
   - **API Secret**: `abc...xyz` (Click "Show" để hiện)

## Bước 3: Cấu hình trong .env

Mở file `.env` và thêm:

```env
CLOUDINARY_CLOUD_NAME=dab1234xy
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abc...xyz
```

**⚠️ LƯU Ý:**
- Thay thế giá trị trên bằng thông tin từ Dashboard của bạn
- KHÔNG commit file `.env` lên Git (đã có trong .gitignore)
- API Secret phải được giữ bí mật

## Bước 4: Kiểm tra kết nối

Chạy test script:
```bash
node test-cloudinary.js
```

Nếu thành công, bạn sẽ thấy:
```
✅ Cloudinary configured successfully
☁️  Cloud Name: dab1234xy
```

## Giới hạn tài khoản miễn phí:

- **Storage**: 25GB
- **Bandwidth**: 25GB/tháng
- **Transformations**: 25,000/tháng
- **API calls**: Unlimited

Đủ cho dự án học tập! 🎉
