// test-cloudinary.js - Script test kết nối Cloudinary
const { cloudinary } = require('./config/cloudinary');
require('dotenv').config();

console.log('\n🧪 Testing Cloudinary Configuration...\n');

// Kiểm tra biến môi trường
console.log('📋 Environment Variables:');
console.log('   CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Not set');
console.log('   CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Not set');
console.log('   CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Set (hidden)' : '❌ Not set');

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.log('\n❌ Vui lòng cấu hình Cloudinary trong file .env');
    console.log('   Xem hướng dẫn trong CLOUDINARY_SETUP.md\n');
    process.exit(1);
}

// Test API call
async function testCloudinaryConnection() {
    try {
        console.log('\n🔍 Testing API connection...');
        
        // Ping Cloudinary API
        const result = await cloudinary.api.ping();
        
        console.log('\n✅ Cloudinary configured successfully!');
        console.log('☁️  Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
        console.log('📦 Status:', result.status);
        
        console.log('\n📊 Usage limits (Free tier):');
        console.log('   • Storage: 25 GB');
        console.log('   • Bandwidth: 25 GB/month');
        console.log('   • Transformations: 25,000/month\n');
        
        return true;
    } catch (error) {
        console.log('\n❌ Cloudinary connection failed!');
        console.log('Error:', error.message);
        
        if (error.http_code === 401) {
            console.log('\n💡 Lỗi xác thực. Kiểm tra lại:');
            console.log('   1. CLOUDINARY_CLOUD_NAME đúng chưa?');
            console.log('   2. CLOUDINARY_API_KEY đúng chưa?');
            console.log('   3. CLOUDINARY_API_SECRET đúng chưa?\n');
        }
        
        return false;
    }
}

// Chạy test
testCloudinaryConnection()
    .then(success => {
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        console.error('Unexpected error:', error);
        process.exit(1);
    });
