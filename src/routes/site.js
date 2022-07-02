const express = require('express');
//Import form validation root
const validate = require('../app/validator/index');

//import tuyến đường do express cung cấp.
const router = express.Router();

//import dữ liệu trong controller.
const siteController = require('../app/controllers/SiteController');

//cấu hình route.
router.get('/search', siteController.search);
router.get('/', siteController.index);
router.post('/register', siteController.register);
router.post('/login', siteController.login);


module.exports = router;