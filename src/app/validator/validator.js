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

module.exports = {
    postCourseValidation,
    postUpdateCourseValidation,
    postTaskValidation,
    updateTaskValidation
};