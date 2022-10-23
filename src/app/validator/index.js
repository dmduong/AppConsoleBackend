//Thêm validate kiểm tra nhập liệu
//import validation
const validation = require("./validator");
const auth = require("../middlewares/Auth");

// Validate root
module.exports = {
  postCourseValidation: validation.postCourseValidation(),
  postUpdateCourseValidation: validation.postUpdateCourseValidation(),
  auth: auth,
  postTaskValidation: validation.postTaskValidation(),
  updateTaskValidation: validation.updateTaskValidation(),
  registerValidation: validation.registerValidation(),
  loginValidation: validation.loginValidation(),
  postCategoryValidation: validation.postCategoryValidation(),
  updateCategoryValidation: validation.updateCategoryValidation(),
  postStatusValidation: validation.postStatusValidation(),
  updateStatusValidation: validation.updateStatusValidation(),
  updateUnitValidation: validation.updateUnitValidation(),
  postUnitValidation: validation.postUnitValidation(),
  updateProductValidation: validation.updateProductValidation(),
  postProductValidation: validation.postProductValidation(),
  postPostValidation: validation.postPostValidation(),
  updatePostValidation: validation.updatePostValidation(),
  postStoreValidation: validation.postStoreValidation(),
  updateStoreValidation: validation.updateStoreValidation(),
};
