//Thêm validate kiểm tra nhập liệu
//import validation
const validation = require('./validator');
const auth = require('../middlewares/Auth');

// Validate root
module.exports = {
    postCourseValidation: validation.postCourseValidation(),
    postUpdateCourseValidation: validation.postUpdateCourseValidation(),
    auth: auth,
    postTaskValidation: validation.postTaskValidation(),
    updateTaskValidation: validation.updateTaskValidation(),
    registerValidation: validation.registerValidation(),
    loginValidation: validation.loginValidation(),
}