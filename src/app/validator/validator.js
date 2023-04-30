// const validate = require('../app/validator/index');
var { check } = require("express-validator");
const { Suppliers } = require("../models/Supplier");
const { Status, Category } = require("../models/Inventory");
const mongoose = require("mongoose");
const { stringUpperCase } = require("../../helpers/util");
const { stringUnicode } = require("../../helpers/util");
const util = require("../../helpers/util");
var ObjectId = require("mongodb").ObjectID;

let postCourseValidation = () => {
  return [
    check("name", "Tên khóa học không được rỗng").not().isEmpty(),
    check("discription", "Miêu tả khóa học không được rỗng").not().isEmpty(),
    check("videoId", "Id video khóa học không được rỗng").not().isEmpty(),
    check("image", "Image khóa học không được rỗng").not().isEmpty(),
    check("level", "Level khóa học không được rỗng").not().isEmpty(),
  ];
};

let postUpdateCourseValidation = () => {
  return [
    check("name", "Tên khóa học không được rỗng").not().isEmpty(),
    check("discription", "Miêu tả khóa học không được rỗng").not().isEmpty(),
    check("videoId", "Id video khóa học không được rỗng").not().isEmpty(),
    check("image", "Image khóa học không được rỗng").not().isEmpty(),
    check("level", "Level khóa học không được rỗng").not().isEmpty(),
  ];
};

let postTaskValidation = () => {
  return [
    check("name", "Name task isempty!").not().isEmpty(),
    // check('age', 'Age task isempty!').not().isEmpty(),
  ];
};

let updateTaskValidation = () => {
  return [check("name", "Name task isempty!").not().isEmpty()];
};

let registerValidation = () => {
  return [
    check("name", "Name not is empty!").not().isEmpty(),
    check("email", "Email not is empty!").not().isEmpty(),
    check("password", "Password not is empty!").not().isEmpty(),
    check("password", "Password must be between 4 to 16 characters").isLength({
      min: 4,
      max: 16,
    }),
    check("re_password", "re-password not is empty!").not().isEmpty(),
    check("re_password") // To delete leading and trailing space
      .trim()

      // Validate minimum length of password
      // Optional for this context
      .isLength({ min: 4, max: 16 })

      // Custom message
      .withMessage("Password must be between 4 to 16 characters")

      // Custom validation
      // Validate confirmPassword
      .custom(async (re_password, { req }) => {
        const password = req.body.password;

        // If password and confirm password not same
        // don't allow to sign up and throw error
        if (password !== re_password) {
          throw new Error("Passwords must be same");
        }
      }),
  ];
};

let loginValidation = () => {
  return [
    check("email", "Email not is empty!").not().isEmpty(),
    check("password", "Password not is empty!").not().isEmpty(),
  ];
};

let postCategoryValidation = () => {
  return [
    check("codeCategory", "Mã danh mục không được rỗng.")
      .not()
      .isEmpty()
      .custom(async (value) => {
        const check = await Category.findOne({
          codeCategory: util.stringUpperCase(util.stringUnicode(value)),
        });
        if (check) {
          return Promise.reject("Mã danh mục đã được sử dụng.");
        }
      }),
    check("nameCategory", "Tên danh mục không được trống.").not().isEmpty(),
    check("detailCategory", "Chi tiết danh mục không được trống.")
      .not()
      .isEmpty(),
    check("status", "Trạng thái không được trống.")
      .not()
      .isEmpty()
      .custom(async (value) => {
        const check = await Status.findById(value);
        if (!check) {
          return Promise.reject("Trạng thái không tồn tại trong hệ thống.");
        }
      }),
  ];
};

let updateCategoryValidation = () => {
  return [
    check("nameCategory", "Tên danh mục không được trống.").not().isEmpty(),
    check("detailCategory", "Chi tết danh mục không được trống.")
      .not()
      .isEmpty(),
    check("status", "Trạng thái không được trống.")
      .not()
      .isEmpty()
      .custom(async (value) => {
        const check = await Status.findById(value);
        if (!check) {
          return Promise.reject("Trạng thái không tồn tại trong hệ thống.");
        }
      }),
  ];
};

let postStatusValidation = () => {
  return [
    check("codeStatus", "Mã trạng thái không được trống.")
      .not()
      .isEmpty()
      .custom(async (value) => {
        let check = await Status.findOne({ codeStatus: value });
        if (check) {
          return Promise.reject("Mã trạng thái đã tồn tại.");
        }
      }),
    check("nameStatus", "Tên trạng thái không được trống.").not().isEmpty(),
  ];
};

let updateStatusValidation = () => {
  return [
    check("nameStatus", "Tên trạng thái không được trống.").not().isEmpty(),
  ];
};

let postUnitValidation = () => {
  return [
    check("codeUnit", "Code unit is empty!").not().isEmpty(),
    check("nameUnit", "Name unit is empty!").not().isEmpty(),
    check("status", "Status is empty!").not().isEmpty(),
    check("detailUnit", "Detail unit is empty!").not().isEmpty(),
  ];
};

let updateUnitValidation = () => {
  return [
    check("nameUnit", "Name unit is empty!").not().isEmpty(),
    check("status", "Status is empty!").not().isEmpty(),
    check("detailUnit", "Detail unit is empty!").not().isEmpty(),
  ];
};

let postProductValidation = () => {
  25;
  return [
    check("codeProduct", "CodeProduct is empty!").not().isEmpty(),
    check("nameProduct", "NameProduct is empty!").not().isEmpty(),
    check("amountProduct", "AmountProduct is empty!").not().isEmpty(),
    check("detailProduct", "DetailProduct is empty!").not().isEmpty(),
    check("priceProduct", "PriceProduct is empty!").not().isEmpty(),
    check("priceSellProduct", "PriceSellProduct is empty!").not().isEmpty(),
    check("weightProduct", "WeightProduct is empty!").not().isEmpty(),
    check("category", "Category is empty!").not().isEmpty(),
    check("unit", "Unit is empty!").not().isEmpty(),
    check("status", "Status is empty!").not().isEmpty(),
  ];
};

let updateProductValidation = () => {
  return [
    check("nameProduct", "NameProduct is empty!").not().isEmpty(),
    check("amountProduct", "AmountProduct is empty!").not().isEmpty(),
    check("detailProduct", "DetailProduct is empty!").not().isEmpty(),
    check("priceProduct", "PriceProduct is empty!").not().isEmpty(),
    check("priceSellProduct", "PriceSellProduct is empty!").not().isEmpty(),
    check("weightProduct", "WeightProduct is empty!").not().isEmpty(),
    check("category", "Category is empty!").not().isEmpty(),
    check("unit", "Unit is empty!").not().isEmpty(),
    check("status", "Status is empty!").not().isEmpty(),
  ];
};

let postPostValidation = () => {
  return [
    // check("codePost", "Code post is empty!").not().isEmpty(),
    check("namePost", "Name post is empty!").not().isEmpty(),
    check("contentPost", "Content post is empty!").not().isEmpty(),
    check("colorPost", "Color post is empty!").not().isEmpty(),
  ];
};

let updatePostValidation = () => {
  return [
    check("namePost", "Name post is empty!").not().isEmpty(),
    check("contentPost", "Content post is empty!").not().isEmpty(),
    check("colorPost", "Color post is empty!").not().isEmpty(),
    check("statusId", "Status post is empty!").not().isEmpty(),
  ];
};

let postStoreValidation = () => {
  return [
    check("codeStore", "Code store is empty!").not().isEmpty(),
    check("nameStore", "Name store is empty!").not().isEmpty(),
    check("phoneStore", "Phone store is empty!").not().isEmpty(),
  ];
};

let updateStoreValidation = () => {
  return [
    check("statusId", "Status store is empty!").not().isEmpty(),
    check("nameStore", "Name store is empty!").not().isEmpty(),
    check("phoneStore", "Phone store is empty!").not().isEmpty(),
  ];
};

let postSupplierValidation = () => {
  return [
    check("codeSupplier", "Mã nhà cung cấp không được để trống.")
      .not()
      .isEmpty()
      .custom(async (value) => {
        let code = await Suppliers.findOne({
          codeSupplier: stringUpperCase(stringUnicode(value)),
        });
        if (code) {
          return Promise.reject("Mã nhà cung cấp đã tồn tại.");
        }
      }),
    check("nameSupplier", "Tên nhà cung cấp không được trống.").not().isEmpty(),
    check("statusId", "Trạng thái nhà cung cấp không được trống.")
      .not()
      .isEmpty(),
    check("phoneSupplier")
      .not()
      .isEmpty()
      .withMessage("Số điện thoại không được để trống.")
      .custom(async (value) => {
        let phone = await Suppliers.findOne({
          phoneSupplier: value,
        });
        if (phone) {
          return Promise.reject("Số điện thoại đã được sử dụng.");
        }
      }),
  ];
};

let updateSupplierValidation = () => {
  return [
    check("nameSupplier", "Tên nhà cung cấp không được trống.").not().isEmpty(),
    check("phoneSupplier", "Số điện thoại không được trống.")
      .not()
      .isEmpty()
      .custom(async (value) => {
        let check = await Suppliers.findOne({ phoneSupplier: value });
        if (check) {
          return Promise.reject("Số điện thoại đã được sử dụng.");
        }
      }),
    check("statusId", "Trạng thái không được trống.")
      .not()
      .isEmpty()
      .custom(async (value) => {
        let status = await Status.findById(value);
        if (!status) {
          return Promise.reject("Không tồn tại trạng thái trong hệ thống.");
        }
      }),
  ];
};

let storeOrderValidation = () => {
  return [check("codeOrder", "Code order is empty!").not().isEmpty()];
};

module.exports = {
  postCourseValidation,
  postUpdateCourseValidation,
  postTaskValidation,
  updateTaskValidation,
  registerValidation,
  loginValidation,
  postCategoryValidation,
  updateCategoryValidation,
  postStatusValidation,
  updateStatusValidation,
  updateUnitValidation,
  postUnitValidation,
  postProductValidation,
  updateProductValidation,
  postPostValidation,
  updatePostValidation,
  postStoreValidation,
  updateStoreValidation,
  postSupplierValidation,
  updateSupplierValidation,
  storeOrderValidation,
};
