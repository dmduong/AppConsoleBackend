const express = require("express");
//import tuyến đường do express cung cấp.
const router = express.Router();

//Import form validation root
const validate = require("../app/validator/index");
//Import upload file to server
const uploadImages = require("../app/middlewares/UploadImages");

//import dữ liệu trong controller.
const storeController = require("../app/controllers/StoreController");

//cấu hình route.
// Products
router.post(
  "/create",
  [
    uploadImages.uploadImageStore.array("imageStore", 12),
    validate.postStoreValidation,
  ],
  storeController.createStore
);
router.get("/getAll/:page/:limit", storeController.getAllStore);
router.get("/:id", storeController.editStore);
router.put(
  "/update/:id",
  [
    uploadImages.uploadImageStore.array("imageStore", 12),
    validate.updateStoreValidation,
  ],
  storeController.updateStore
);
router.delete("/delete/:id", storeController.deleteStore);

module.exports = router;
