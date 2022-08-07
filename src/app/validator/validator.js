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

let postCategoryValidation = () => {
    return [
        check('codeCategory', 'Code category is empty!').not().isEmpty(),
        check('nameCategory', 'Name category is empty!').not().isEmpty(),
        check('detailCategory', 'Detail category is empty!').not().isEmpty(),
        check('status', 'Please select status!').not().isEmpty(),
    ];
}

let updateCategoryValidation = () => {
    return [
        check('nameCategory', 'Name category is empty!').not().isEmpty(),
        check('detailCategory', 'Detail category is empty!').not().isEmpty(),
        check('status', 'Please select status!').not().isEmpty(),
    ];
}

let postStatusValidation = () => {
    return [
        check('codeStatus', 'Code status is empty!').not().isEmpty(),
        check('nameStatus', 'Name status is empty!').not().isEmpty(),
    ];
}

let updateStatusValidation = () => {
    return [
        check('nameStatus', 'Name status is empty!').not().isEmpty(),
    ];
}

let postUnitValidation = () => {
    return [
        check('codeUnit', 'Code unit is empty!').not().isEmpty(),
        check('nameUnit', 'Name unit is empty!').not().isEmpty(),
        check('status', 'Status is empty!').not().isEmpty(),
        check('detailUnit', 'Detail unit is empty!').not().isEmpty(),
    ];
}

let updateUnitValidation = () => {
    return [
        check('nameUnit', 'Name unit is empty!').not().isEmpty(),
        check('status', 'Status is empty!').not().isEmpty(),
        check('detailUnit', 'Detail unit is empty!').not().isEmpty(),
    ];
}

let postProductValidation = () => {
    return [
        check('codeProduct', 'CodeProduct is empty!').not().isEmpty(),
        check('nameProduct', 'NameProduct is empty!').not().isEmpty(),
        check('amountProduct', 'AmountProduct is empty!').not().isEmpty(),
        check('detailProduct', 'DetailProduct is empty!').not().isEmpty(),
        check('priceProduct', 'PriceProduct is empty!').not().isEmpty(),
        check('priceSellProduct', 'PriceSellProduct is empty!').not().isEmpty(),
        check('weightProduct', 'WeightProduct is empty!').not().isEmpty(),
        check('category', 'Category is empty!').not().isEmpty(),
        check('unit', 'Unit is empty!').not().isEmpty(),
        check('status', 'Status is empty!').not().isEmpty(),
    ];
}

let updateProductValidation = () => {
    return [
        check('nameProduct', 'NameProduct is empty!').not().isEmpty(),
        check('amountProduct', 'AmountProduct is empty!').not().isEmpty(),
        check('detailProduct', 'DetailProduct is empty!').not().isEmpty(),
        check('priceProduct', 'PriceProduct is empty!').not().isEmpty(),
        check('priceSellProduct', 'PriceSellProduct is empty!').not().isEmpty(),
        check('weightProduct', 'WeightProduct is empty!').not().isEmpty(),
        check('category', 'Category is empty!').not().isEmpty(),
        check('unit', 'Unit is empty!').not().isEmpty(),
        check('status', 'Status is empty!').not().isEmpty(),
    ];
}

module.exports = {
    postCourseValidation,
    postUpdateCourseValidation,
    postTaskValidation,
    updateTaskValidation,
    registerValidation,
    loginValidation,
    postCategoryValidation,
    updateCategoryValidation,
    postStatusValidation,
    updateStatusValidation,
    updateUnitValidation,
    postUnitValidation,
    postProductValidation,
    updateProductValidation
};