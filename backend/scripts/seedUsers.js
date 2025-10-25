// scripts/seedUsers.js
// Script để tạo dữ liệu test users trong database

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

// MongoDB Connection String từ .env
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/userDB';

console.log('📍 MONGO_URI:', MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Log URI (hide password)

// Dữ liệu test users
const testUsers = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
        name: 'Moderator User',
        email: 'moderator@example.com',
        password: 'mod123',
        role: 'moderator',
        avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
        name: 'Regular User 1',
        email: 'user1@example.com',
        password: 'user123',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
        name: 'Regular User 2',
        email: 'user2@example.com',
        password: 'user123',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?img=4'
    },
    {
        name: 'Regular User 3',
        email: 'user3@example.com',
        password: 'user123',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?img=5'
    }
];

// Hàm seed users
const seedUsers = async () => {
    try {
        console.log('🔄 Đang kết nối MongoDB...');
        
        // Kết nối MongoDB
        await mongoose.connect(MONGO_URI);
        
        console.log('✅ MongoDB đã kết nối');
        console.log('🗑️  Xóa tất cả users cũ...');
        
        // Xóa tất cả users cũ
        await User.deleteMany({});
        
        console.log('✅ Đã xóa users cũ');
        console.log('📝 Đang tạo users mới...');
        
        // Tạo users mới
        const createdUsers = await User.create(testUsers);
        
        console.log(`✅ Đã tạo ${createdUsers.length} users thành công!`);
        console.log('\n📋 Danh sách users đã tạo:');
        console.log('═══════════════════════════════════════════════════════');
        
        createdUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user.role.toUpperCase().padEnd(10)} | ${user.email.padEnd(25)} | Password: ${testUsers[index].password}`);
        });
        
        console.log('═══════════════════════════════════════════════════════');
        console.log('\n🎉 Seed hoàn tất! Bây giờ bạn có thể đăng nhập với các tài khoản trên.');
        console.log('\n💡 Ví dụ đăng nhập:');
        console.log('   Email: admin@example.com');
        console.log('   Password: admin123');
        
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Lỗi khi seed users:', error);
        process.exit(1);
    }
};

// Chạy seed
seedUsers();
