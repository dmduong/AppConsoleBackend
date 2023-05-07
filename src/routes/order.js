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
router.get("/getAll/:page/:limit", [], controller.getOrder);
router.get("/detail/:id", [], controller.orderDetail);
router.get("/getInforOrder/:id", [], controller.getInforOrder);
router.put("/update/:id", [validate.updateOrderValidation], controller.updateOrder);
router.delete("/delete/:id", [validate.updateOrderValidation], controller.deleteOrder);
router.patch("/payment", [], controller.payment);

module.exports = router;
