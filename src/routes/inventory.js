const express = require("express");
//import tuyến đường do express cung cấp.
const router = express.Router();

//Import form validation root
const validate = require("../app/validator/index");
//Import upload file to server
const uploadImages = require("../app/middlewares/UploadImages");

//import dữ liệu trong controller.
const inventoryController = require("../app/controllers/InventoryController");

//cấu hình route.

//Category
router.post(
  "/category/store",
  [validate.postCategoryValidation],
  inventoryController.storeCategory
);
router.get("/category/getAll", inventoryController.getAllCategory);
router.get("/category/:id", inventoryController.editCategory);
router.put(
  "/category/update/:id",
  [validate.updateCategoryValidation],
  inventoryController.updateCategory
);
router.delete("/category/delete/:id", inventoryController.deleteCategory);

//Status
router.post(
  "/status/store",
  [validate.postStatusValidation],
  inventoryController.storeStatus
);
router.get("/status/getAll", inventoryController.getAllStatus);
router.get("/status/:id", inventoryController.editStatus);
router.put(
  "/status/update/:id",
  [validate.updateStatusValidation],
  inventoryController.updateStatus
);
router.delete("/status/delete/:id", inventoryController.deleteStatus);

//Unit
router.post(
  "/unit/store",
  [validate.postUnitValidation],
  inventoryController.storeUnit
);
router.get("/unit/getAll", inventoryController.getAllUnit);
router.get("/unit/:id", inventoryController.editUnit);
router.put(
  "/unit/update/:id",
  [validate.updateUnitValidation],
  inventoryController.updateUnit
);
router.delete("/unit/delete/:id", inventoryController.deleteUnit);

// Products
router.post(
  "/product/store",
  [
    uploadImages.uploadImages.array("imageProducts", 12),
    validate.postProductValidation,
  ],
  inventoryController.storeProduct
);
router.get("/product/getAll/:page/:limit", inventoryController.getAllProduct);
router.get("/product/:id", inventoryController.editProduct);
router.put(
  "/product/update/:id",
  [
    uploadImages.uploadImages.array("imageProducts", 12),
    validate.updateProductValidation,
  ],
  inventoryController.updateProduct
);
router.delete("/product/delete/:id", inventoryController.deleteProduct);

module.exports = router;
