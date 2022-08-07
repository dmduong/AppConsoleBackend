const express = require('express');
//import tuyến đường do express cung cấp.
const router = express.Router();

//Import form validation root
const validate = require('../app/validator/index');
//Import upload file to server
const uploadImages = require('../app/middlewares/UploadImages');

//import dữ liệu trong controller.
const inventoryController = require('../app/controllers/InventoryController');

//cấu hình route.

//Category
router.post('/category/store', [validate.auth, validate.postCategoryValidation], inventoryController.storeCategory);
router.get('/category/getAll', [validate.auth], inventoryController.getAllCategory);
router.get('/category/:id', [validate.auth], inventoryController.editCategory);
router.put('/category/update/:id', [validate.auth, validate.updateCategoryValidation], inventoryController.updateCategory);
router.delete('/category/delete/:id', [validate.auth], inventoryController.deleteCategory);

//Status
router.post('/status/store', [validate.auth, validate.postStatusValidation], inventoryController.storeStatus);
router.get('/status/getAll', [validate.auth], inventoryController.getAllStatus);
router.get('/status/:id', [validate.auth], inventoryController.editStatus);
router.put('/status/update/:id', [validate.auth, validate.updateStatusValidation], inventoryController.updateStatus);
router.delete('/status/delete/:id', [validate.auth], inventoryController.deleteStatus);

//Unit
router.post('/unit/store', [validate.auth, validate.postUnitValidation], inventoryController.storeUnit);
router.get('/unit/getAll', [validate.auth], inventoryController.getAllUnit);
router.get('/unit/:id', [validate.auth], inventoryController.editUnit);
router.put('/unit/update/:id', [validate.auth, validate.updateUnitValidation], inventoryController.updateUnit);
router.delete('/unit/delete/:id', [validate.auth], inventoryController.deleteUnit);

// Products
router.post('/product/store', [uploadImages.uploadImages.single('imageProducts'), validate.auth, validate.postProductValidation], inventoryController.storeProduct);
router.get('/product/getAll', [validate.auth], inventoryController.getAllProduct);
router.get('/product/:id', [validate.auth], inventoryController.editProduct);
router.put('/product/update/:id', [validate.auth, validate.updateProductValidation], inventoryController.updateProduct);
router.delete('/product/delete/:id', [validate.auth], inventoryController.deleteProduct);


module.exports = router;