const express = require("express");
//import tuyến đường do express cung cấp.
const router = express.Router();

//Import form validation root
const validate = require("../app/validator/index");
//Import upload file to server
const uploadImages = require("../app/middlewares/UploadImages");

//import dữ liệu trong controller.
const postController = require("../app/controllers/PostController");

//cấu hình route.
// Products
router.post(
  "/post/store",
  [
    uploadImages.uploadImagesPost.array("imagePost", 12),
    validate.auth,
    validate.postPostValidation,
  ],
  postController.storePosts
);
router.get("/post/getAll", [validate.auth], postController.getAllPosts);
router.get("/post/:id", [validate.auth], postController.editPost);
router.put(
  "/post/update/:id",
  [
    uploadImages.uploadImagesPost.array("imagePost", 12),
    validate.auth,
    validate.updatePostValidation,
  ],
  postController.updatePosts
);
router.delete("/post/delete/:id", [validate.auth], postController.deletePost);

module.exports = router;
