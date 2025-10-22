// seedUsers.js - Script tạo dữ liệu mẫu với các role khác nhau
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

// Dữ liệu mẫu
const sampleUsers = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin"
    },
    {
        name: "Moderator User",
        email: "moderator@example.com",
        password: "moderator123",
        role: "moderator"
    },
    {
        name: "Regular User 1",
        email: "user1@example.com",
        password: "user123",
        role: "user"
    },
    {
        name: "Regular User 2",
        email: "user2@example.com",
        password: "user123",
        role: "user"
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: "john123",
        role: "user"
    }
];

const seedDatabase = async () => {
    try {
        // Kết nối MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Đã kết nối MongoDB");

        // Xóa tất cả users cũ (nếu muốn reset)
        // await User.deleteMany({});
        // console.log("🗑️  Đã xóa tất cả users cũ");

        // Kiểm tra và chỉ thêm users chưa tồn tại
        for (const userData of sampleUsers) {
            const existingUser = await User.findOne({ email: userData.email });
            
            if (!existingUser) {
                const user = new User(userData);
                await user.save();
                console.log(`✅ Đã tạo ${userData.role}: ${userData.name} (${userData.email})`);
            } else {
                console.log(`⚠️  User đã tồn tại: ${userData.email}`);
            }
        }

        console.log("\n🎉 Seed database hoàn tất!");
        console.log("\n📋 Thông tin đăng nhập:");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("👑 ADMIN:");
        console.log("   Email: admin@example.com");
        console.log("   Password: admin123");
        console.log("\n🛡️  MODERATOR:");
        console.log("   Email: moderator@example.com");
        console.log("   Password: moderator123");
        console.log("\n👤 USER:");
        console.log("   Email: user1@example.com");
        console.log("   Password: user123");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Lỗi khi seed database:", error);
        process.exit(1);
    }
};

// Chạy seed
seedDatabase();
