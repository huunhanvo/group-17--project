// middleware/uploadMiddleware.js
const multer = require('multer');
const sharp = require('sharp');

// Cấu hình Multer để lưu file vào memory
const storage = multer.memoryStorage();

// Filter chỉ chấp nhận file ảnh
const fileFilter = (req, file, cb) => {
    // Kiểm tra mimetype
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh! (jpg, jpeg, png, gif)'), false);
    }
};

// Cấu hình upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Giới hạn 5MB
    }
});

// Middleware resize ảnh với Sharp
const resizeAvatar = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {
        console.log('🔄 Đang resize ảnh...', {
            originalSize: req.file.size,
            originalFormat: req.file.mimetype
        });

        // Resize ảnh về 500x500px, format webp/jpeg để tối ưu dung lượng
        // Giảm quality xuống 80% để upload nhanh hơn
        const resizedBuffer = await sharp(req.file.buffer)
            .resize(500, 500, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({ quality: 80, progressive: true }) // Dùng JPEG thay vì WebP cho tương thích tốt hơn
            .toBuffer();

        // Gắn buffer đã resize vào req.file
        req.file.buffer = resizedBuffer;
        req.file.mimetype = 'image/jpeg';

        console.log('✅ Ảnh đã được resize:', {
            originalSize: req.file.size,
            resizedSize: resizedBuffer.length,
            reduction: `${((1 - resizedBuffer.length / req.file.size) * 100).toFixed(1)}%`,
            format: 'jpeg'
        });

        next();
    } catch (error) {
        console.error('❌ Lỗi khi resize ảnh:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi xử lý ảnh',
            error: error.message
        });
    }
};

module.exports = {
    upload,
    resizeAvatar
};
