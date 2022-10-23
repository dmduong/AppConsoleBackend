const express = require("express");
//import tuyến đường do express cung cấp.
const router = express.Router();

//Import form validation root
const validate = require("../app/validator/index");
//Import upload file to server
const uploadImages = require("../app/middlewares/UploadImages");

//import dữ liệu trong controller.
const controller = require("../app/controllers/OrderController");

router.post("/store", [validate.storeOrderValidation], controller.storeOrder);

module.exports = router;
