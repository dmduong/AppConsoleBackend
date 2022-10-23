const express = require("express");
//import tuyến đường do express cung cấp.
const router = express.Router();

//Import form validation root
const validate = require("../app/validator/index");
//Import upload file to server
const uploadImages = require("../app/middlewares/UploadImages");

//import dữ liệu trong controller.
const controller = require("../app/controllers/SupplierController.js");

router.post(
  "/store",
  [validate.postSupplierValidation],
  controller.storeSupplier
);
router.get("/getAll/:page/:limit", controller.getAllSupplier);
router.get("/:id", controller.editSupplier);
router.put(
  "/update/:id",
  [validate.updateSupplierValidation],
  controller.updateSupplier
);
router.delete("/delete/:id", controller.deleteSupplier);

module.exports = router;
