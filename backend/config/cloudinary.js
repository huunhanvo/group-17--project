// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cấu hình Cloudinary với timeout tăng lên
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    timeout: 60000, // 60 seconds timeout (default 60000)
    secure: true
});

// Function upload ảnh lên Cloudinary với error handling tốt hơn
const uploadToCloudinary = async (buffer, folder = 'avatars') => {
    return new Promise((resolve, reject) => {
        // Set timeout riêng cho upload stream
        const uploadOptions = {
            folder: folder,
            resource_type: 'auto',
            timeout: 60000, // 60 seconds
            transformation: [
                { width: 500, height: 500, crop: 'fill', gravity: 'face' },
                { quality: 'auto:good', fetch_format: 'auto' }
            ],
            // Tối ưu thêm
            eager: [
                { width: 200, height: 200, crop: 'thumb', gravity: 'face' }
            ],
            eager_async: true,
            eager_notification_url: null
        };

        const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error details:', {
                        message: error.message,
                        http_code: error.http_code,
                        name: error.name
                    });
                    reject(error);
                } else {
                    console.log('✅ Cloudinary upload success:', result.secure_url);
                    resolve(result);
                }
            }
        );
        
        uploadStream.end(buffer);
    });
};

// Function xóa ảnh khỏi Cloudinary
const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw error;
    }
};

module.exports = {
    cloudinary,
    uploadToCloudinary,
    deleteFromCloudinary
};
