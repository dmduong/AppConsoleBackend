const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images/products/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {

    //reject file
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error('Lỗi: Không đúng định dạng hình ảnh!'), false);
    }
}

const uploadImages = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = { uploadImages };