const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/products/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const storagePost = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/posts/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const storageStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/store/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  //reject file
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Lỗi: Không đúng định dạng hình ảnh!"), false);
  }
};

/*Uploads images products*/
const uploadImages = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  storage: storage,
  fileFilter: fileFilter,
});

/*Uploads images post*/
const uploadImagesPost = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  storage: storagePost,
  fileFilter: fileFilter,
});

/**
 * Upload image store
 */

const uploadImageStore = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  storage: storageStore,
  fileFilter: fileFilter,
});

module.exports = { uploadImages, uploadImagesPost, uploadImageStore };
