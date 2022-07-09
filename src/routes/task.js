const express = require('express');
//import tuyến đường do express cung cấp.
const router = express.Router();

//Import form validation root
const validate = require('../app/validator/index');

//import dữ liệu trong controller.
const taskController = require('../app/controllers/TaskController');

//cấu hình route.
router.get('/getAllTask', taskController.getAll);
router.post('/store', validate.postTaskValidation, taskController.store);
router.get('/edit/:id', taskController.edit);
router.put('/update/:id', validate.updateTaskValidation, taskController.update);
router.delete('/delete/:id', taskController.delete);

module.exports = router;