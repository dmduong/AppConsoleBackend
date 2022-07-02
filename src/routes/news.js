const express = require('express');

//import tuyến đường do express cung cấp.
const router = express.Router();

//import dữ liệu trong controller.
const newsController = require('../app/controllers/NewsController');

//cấu hình route.
router.get('/:slug', newsController.show);
router.get('/', newsController.index);


module.exports = router;