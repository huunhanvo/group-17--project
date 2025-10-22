// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function upload ảnh lên Cloudinary
const uploadToCloudinary = async (buffer, folder = 'avatars') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'auto',
                transformation: [
                    { width: 500, height: 500, crop: 'fill', gravity: 'face' },
                    { quality: 'auto', fetch_format: 'auto' }
                ]
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
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
