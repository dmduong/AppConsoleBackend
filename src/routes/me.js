const express = require('express');
//Import form validation root
const validate = require('../app/validator/index');

//import tuyến đường do express cung cấp.
const router = express.Router();

//import dữ liệu trong controller.
const meController = require('../app/controllers/MeController');

//cấu hình route.
router.get('/stored/course', meController.myCourse);
router.get('/trash/course', meController.myTrash);
router.get('/informations', validate.auth, meController.info);
router.post('/logout', validate.auth, meController.logout);
router.post('/logoutAll', validate.auth, meController.logoutAll);

module.exports = router;