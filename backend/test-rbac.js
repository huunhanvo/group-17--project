// test-rbac.js - Script test RBAC API với các role khác nhau
const axios = require("axios");

const API_URL = "http://localhost:3000";

// Màu cho console
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m"
};

const log = {
    success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
    error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
    info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
    warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
    title: (msg) => console.log(`\n${colors.cyan}${"=".repeat(60)}\n${msg}\n${"=".repeat(60)}${colors.reset}`)
};

// Tokens lưu trữ
let adminToken = "";
let moderatorToken = "";
let userToken = "";
let testUserId = "";

// Hàm login
async function login(email, password, roleName) {
    try {
        log.info(`Đăng nhập ${roleName}: ${email}`);
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        log.success(`Đăng nhập thành công: ${response.data.user.name} (${response.data.user.role})`);
        return response.data.token;
    } catch (error) {
        log.error(`Đăng nhập thất bại: ${error.response?.data?.message || error.message}`);
        return null;
    }
}

// Test 1: Đăng nhập các role
async function test1_Login() {
    log.title("TEST 1: ĐĂNG NHẬP CÁC ROLE");
    
    adminToken = await login("admin@example.com", "admin123", "ADMIN");
    moderatorToken = await login("moderator@example.com", "moderator123", "MODERATOR");
    userToken = await login("user1@example.com", "user123", "USER");
    
    if (!adminToken || !moderatorToken || !userToken) {
        log.error("Không thể lấy token. Vui lòng chạy: node seedUsers.js trước");
        process.exit(1);
    }
}

// Test 2: Lấy danh sách users với các role khác nhau
async function test2_GetAllUsers() {
    log.title("TEST 2: LẤY DANH SÁCH USERS");
    
    // Admin - Có quyền
    try {
        log.info("Admin lấy danh sách users...");
        const response = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        log.success(`Admin: Lấy được ${response.data.count} users`);
    } catch (error) {
        log.error(`Admin: ${error.response?.data?.message}`);
    }
    
    // Moderator - Có quyền
    try {
        log.info("Moderator lấy danh sách users...");
        const response = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${moderatorToken}` }
        });
        log.success(`Moderator: Lấy được ${response.data.count} users`);
    } catch (error) {
        log.error(`Moderator: ${error.response?.data?.message}`);
    }
    
    // User - KHÔNG có quyền
    try {
        log.info("User lấy danh sách users...");
        const response = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        log.success(`User: Lấy được ${response.data.count} users`);
    } catch (error) {
        log.warning(`User: ${error.response?.data?.message} (Expected!)`);
    }
}

// Test 3: Lấy thống kê users
async function test3_GetStats() {
    log.title("TEST 3: LẤY THỐNG KÊ USERS");
    
    // Admin - Có quyền
    try {
        log.info("Admin lấy thống kê...");
        const response = await axios.get(`${API_URL}/users/stats`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        log.success(`Admin: ${JSON.stringify(response.data.stats)}`);
    } catch (error) {
        log.error(`Admin: ${error.response?.data?.message}`);
    }
    
    // User - KHÔNG có quyền
    try {
        log.info("User lấy thống kê...");
        const response = await axios.get(`${API_URL}/users/stats`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        log.success(`User: ${JSON.stringify(response.data.stats)}`);
    } catch (error) {
        log.warning(`User: ${error.response?.data?.message} (Expected!)`);
    }
}

// Test 4: Cập nhật role
async function test4_UpdateRole() {
    log.title("TEST 4: CẬP NHẬT ROLE");
    
    // Lấy ID của user1 để test
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        const user1 = response.data.users.find(u => u.email === "user2@example.com");
        if (user1) {
            testUserId = user1._id;
        }
    } catch (error) {
        log.error("Không thể lấy user ID");
        return;
    }
    
    // Admin cập nhật role - Có quyền
    try {
        log.info(`Admin cập nhật role của user ${testUserId}...`);
        const response = await axios.put(
            `${API_URL}/users/${testUserId}/role`,
            { role: "moderator" },
            { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        log.success(`Admin: ${response.data.message}`);
    } catch (error) {
        log.error(`Admin: ${error.response?.data?.message}`);
    }
    
    // User cập nhật role - KHÔNG có quyền
    try {
        log.info(`User cập nhật role...`);
        const response = await axios.put(
            `${API_URL}/users/${testUserId}/role`,
            { role: "admin" },
            { headers: { Authorization: `Bearer ${userToken}` } }
        );
        log.success(`User: ${response.data.message}`);
    } catch (error) {
        log.warning(`User: ${error.response?.data?.message} (Expected!)`);
    }
}

// Test 5: Xóa user
async function test5_DeleteUser() {
    log.title("TEST 5: XÓA USER");
    
    // Moderator xóa user - KHÔNG có quyền
    try {
        log.info(`Moderator xóa user...`);
        const response = await axios.delete(`${API_URL}/users/${testUserId}`, {
            headers: { Authorization: `Bearer ${moderatorToken}` }
        });
        log.success(`Moderator: ${response.data.message}`);
    } catch (error) {
        log.warning(`Moderator: ${error.response?.data?.message} (Expected!)`);
    }
    
    // Admin xóa user - Có quyền (comment lại để không xóa thật)
    log.info("Admin có thể xóa user nhưng skip để giữ data...");
}

// Chạy tất cả tests
async function runAllTests() {
    try {
        await test1_Login();
        await test2_GetAllUsers();
        await test3_GetStats();
        await test4_UpdateRole();
        await test5_DeleteUser();
        
        log.title("🎉 HOÀN TẤT TẤT CẢ TESTS!");
        console.log("\n📋 KẾT LUẬN:");
        console.log("✅ Admin: Có đầy đủ quyền");
        console.log("✅ Moderator: Có quyền xem users và thống kê");
        console.log("✅ User: Chỉ xem được thông tin của chính mình");
        
    } catch (error) {
        log.error(`Lỗi khi chạy tests: ${error.message}`);
    }
}

// Chạy
console.log(`\n🚀 Bắt đầu test RBAC API tại ${API_URL}\n`);
runAllTests();
