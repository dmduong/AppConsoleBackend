// const validate = require('../app/validator/index');
var { check } = require('express-validator');


let postCourseValidation = () => {
    return [
        check('name', 'Tên khóa học không được rỗng').not().isEmpty(),
        check('discription', 'Miêu tả khóa học không được rỗng').not().isEmpty(),
        check('videoId', 'Id video khóa học không được rỗng').not().isEmpty(),
        check('image', 'Image khóa học không được rỗng').not().isEmpty(),
        check('level', 'Level khóa học không được rỗng').not().isEmpty(),
    ];
}

let postUpdateCourseValidation = () => {
    return [
        check('name', 'Tên khóa học không được rỗng').not().isEmpty(),
        check('discription', 'Miêu tả khóa học không được rỗng').not().isEmpty(),
        check('videoId', 'Id video khóa học không được rỗng').not().isEmpty(),
        check('image', 'Image khóa học không được rỗng').not().isEmpty(),
        check('level', 'Level khóa học không được rỗng').not().isEmpty(),
    ];
}

let postTaskValidation = () => {
    return [
        check('name', 'Name task isempty!').not().isEmpty(),
        // check('age', 'Age task isempty!').not().isEmpty(),
    ];
};

let updateTaskValidation = () => {
    return [
        check('name', 'Name task isempty!').not().isEmpty(),
    ];
};

let registerValidation = () => {
    return [
        check('name', 'Name not is empty!').not().isEmpty(),
        check('email', 'Email not is empty!').not().isEmpty(),
        check('password', 'Password not is empty!').not().isEmpty(),
        check('password', 'Password must be between 4 to 16 characters').isLength({ min: 4, max: 16 }),
        check('re_password', 're-password not is empty!').not().isEmpty(),
        check('re_password')    // To delete leading and trailing space
            .trim()

            // Validate minimum length of password
            // Optional for this context
            .isLength({ min: 4, max: 16 })

            // Custom message
            .withMessage('Password must be between 4 to 16 characters')

            // Custom validation
            // Validate confirmPassword
            .custom(async (re_password, { req }) => {
                const password = req.body.password

                // If password and confirm password not same
                // don't allow to sign up and throw error
                if (password !== re_password) {
                    throw new Error('Passwords must be same')
                }
            })
    ];
};

let loginValidation = () => {
    return [
        check('email', 'Email not is empty!').not().isEmpty(),
        check('password', 'Password not is empty!').not().isEmpty(),
    ];
};

module.exports = {
    postCourseValidation,
    postUpdateCourseValidation,
    postTaskValidation,
    updateTaskValidation,
    registerValidation,
    loginValidation
};