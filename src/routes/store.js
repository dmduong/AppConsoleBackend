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
    validate.auth,
    validate.postStoreValidation,
  ],
  storeController.createStore
);
router.get(
  "/getAll/:page/:limit",
  [validate.auth],
  storeController.getAllStore
);
router.get("/:id", [validate.auth], storeController.editStore);
router.put(
  "/update/:id",
  [
    validate.auth,
    uploadImages.uploadImageStore.array("imageStore", 12),
    validate.updateStoreValidation,
  ],
  storeController.updateStore
);
router.delete("/delete/:id", [validate.auth], storeController.deleteStore);

module.exports = router;
