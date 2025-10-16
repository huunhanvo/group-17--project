# RBAC API Testing Script

## 1. Tạo dữ liệu mẫu users (cần admin token)

POST http://localhost:5000/users/admin/sample-data
Content-Type: application/json
Authorization: Bearer <ADMIN_TOKEN>

{}

## 2. Đăng nhập với admin

POST http://localhost:5000/auth/login
Content-Type: application/json

{
"email": "admin@example.com",
"password": "123456"
}

## 3. Đăng nhập với moderator

POST http://localhost:5000/auth/login
Content-Type: application/json

{
"email": "moderator@example.com",
"password": "123456"
}

## 4. Đăng nhập với user

POST http://localhost:5000/auth/login
Content-Type: application/json

{
"email": "user@example.com",
"password": "123456"
}

## 5. Test phân quyền - Lấy danh sách users (Moderator+)

GET http://localhost:5000/users
Authorization: Bearer <MODERATOR_OR_ADMIN_TOKEN>

## 6. Test phân quyền - Cập nhật role (Admin only)

PUT http://localhost:5000/users/{USER_ID}/role
Content-Type: application/json
Authorization: Bearer <ADMIN_TOKEN>

{
"role": "moderator"
}

## 7. Test phân quyền - Xóa user (Admin only)

DELETE http://localhost:5000/users/{USER_ID}
Authorization: Bearer <ADMIN_TOKEN>

## 8. Test thống kê users (Admin only)

GET http://localhost:5000/users/admin/stats
Authorization: Bearer <ADMIN_TOKEN>

## 9. Test refresh token

POST http://localhost:5000/auth/refresh
Content-Type: application/json

{
"refreshToken": "<REFRESH_TOKEN>"
}
