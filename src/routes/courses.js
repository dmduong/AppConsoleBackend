const express = require('express');
//import tuyến đường do express cung cấp.
const router = express.Router();

//Import form validation root
const validate = require('../app/validator/index');

//import dữ liệu trong controller.
const coursesController = require('../app/controllers/CoursesController');

//cấu hình route.
router.post('/actionmulti', coursesController.actionmulti);
router.get('/:id/edit', coursesController.edit);
router.delete('/:id/delete', coursesController.delete);
router.delete('/:id/deletetrash', coursesController.deletetrash);
router.patch('/:id/restore', coursesController.restore);
router.put('/:id', validate.postUpdateCourseValidation, coursesController.update);
router.post('/store', validate.postCourseValidation, coursesController.store);
router.get('/create', coursesController.create);
router.get('/:slug', coursesController.show);

module.exports = router;