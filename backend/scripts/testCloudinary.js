// scripts/testCloudinary.js
// Script kiểm tra Cloudinary connection

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const cloudinary = require('cloudinary').v2;

console.log('🔍 Testing Cloudinary Configuration...\n');

// Log config (ẩn secret)
console.log('📋 Cloudinary Config:');
console.log('  Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('  API Key:', process.env.CLOUDINARY_API_KEY);
console.log('  API Secret:', process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'NOT SET');
console.log('');

// Configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// Test ping
async function testCloudinary() {
    try {
        console.log('🔄 Testing Cloudinary connection...');
        
        // Test 1: Ping API
        const pingResult = await cloudinary.api.ping();
        console.log('✅ Cloudinary API Ping:', pingResult.status);
        
        // Test 2: Get usage stats
        console.log('\n🔄 Getting account usage...');
        const usage = await cloudinary.api.usage();
        console.log('✅ Account Usage:');
        console.log('  Plan:', usage.plan);
        console.log('  Credits Used:', usage.credits.usage);
        console.log('  Credits Limit:', usage.credits.limit);
        console.log('  Storage Used:', (usage.storage.usage / 1024 / 1024).toFixed(2), 'MB');
        
        // Test 3: List avatars folder (if exists)
        console.log('\n🔄 Checking avatars folder...');
        try {
            const resources = await cloudinary.api.resources({
                type: 'upload',
                prefix: 'avatars/',
                max_results: 5
            });
            console.log('✅ Avatars folder exists with', resources.resources.length, 'images');
            if (resources.resources.length > 0) {
                console.log('  Latest images:');
                resources.resources.slice(0, 3).forEach(img => {
                    console.log('    -', img.public_id, `(${(img.bytes / 1024).toFixed(1)} KB)`);
                });
            }
        } catch (err) {
            console.log('⚠️  Avatars folder not found (will be created on first upload)');
        }
        
        console.log('\n🎉 Cloudinary test PASSED! Ready to upload avatars!');
        console.log('\n💡 Tips:');
        console.log('  - Max file size: 5MB (configured in uploadMiddleware.js)');
        console.log('  - Images will be resized to 500x500px');
        console.log('  - Format: JPEG with 80% quality');
        console.log('  - Timeout: 60 seconds');
        
        process.exit(0);
        
    } catch (error) {
        console.error('\n❌ Cloudinary test FAILED!');
        console.error('Error:', error.message);
        
        if (error.error && error.error.message) {
            console.error('Details:', error.error.message);
        }
        
        console.log('\n🔧 Troubleshooting:');
        console.log('  1. Check CLOUDINARY_CLOUD_NAME in .env');
        console.log('  2. Check CLOUDINARY_API_KEY in .env');
        console.log('  3. Check CLOUDINARY_API_SECRET in .env');
        console.log('  4. Verify credentials at: https://cloudinary.com/console');
        console.log('  5. Make sure account is active');
        
        process.exit(1);
    }
}

// Run test
testCloudinary();
