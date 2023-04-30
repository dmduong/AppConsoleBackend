const { Suppliers } = require("../models/Supplier.js");
const template = require("../../helpers/template.js");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose.js");
const mess = require("../../messages/messagesFollowsStatus");
const upload = require("../middlewares/Auth");
const Resize = require("../../util/Resize");
const destination = "/images/store/";
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { publicDecrypt } = require("crypto");
const { post } = require("../../routes/post.js");
const { options } = require("joi");
const { Status } = require("../models/Inventory.js");
const { stringUpperCase, stringUnicode } = require("../../helpers/util.js");

class SupplierController {
  async storeSupplier(req, res, next) {
    let getIdStore = await template.storeIdGetFromToken(req);
    let dataForm = await template.getRequest(req);
    let { codeSupplier } = dataForm;
    const errors = await mess.showValidations(400, req, res, next);
    if (!errors.isEmpty()) {
      return res.json({
        error: "Lỗi nhập dữ liệu.",
        status: 400,
        messages: errors.array(),
      });
    }

    let codeUper = stringUpperCase(stringUnicode(codeSupplier));
    let data = { ...dataForm, storeId: getIdStore, codeSupplier: codeUper };
    let result = await Suppliers.createSupplier(data);
    if (result) {
      return await template.showJson(res, 200, {
        status: 200,
        messages: "Thực hiện thêm mới thành công.",
        data: result,
      });
    } else {
      return await template.showJson(res, 404, {
        status: 404,
        messages: "Thực hiện thêm mới không thành công.",
      });
    }
  }

  async getAllSupplier(req, res, next) {
    let getIdStore = await template.storeIdGetFromToken(req);
    const page = Math.max(0, req.params.page);
    const limit = req.params.limit;

    let data = await Suppliers.getAllSupplier(getIdStore, page, limit);
    if (data) {
      return await template.showJson(res, 200, {
        status: 200,
        messages: "Lấy thông tin thành công.",
        data: data,
      });
    } else {
      return await template.showJson(res, 404, {
        status: 404,
        messages: "Lấy thông tin không thành công.",
      });
    }
  }

  async getStatus(req, res, next) {
    try {
      let storeId = await template.storeIdGetFromToken(req);
      let getUser = await template.userGetFromToken(req);
      const result = await Status.find({ storeId: storeId })
        .sort({
          createdAt: "desc",
        })
        .select("_id codeStatus nameStatus");
      if (result.length <= 0) {
        return res.json({
          status: 404,
          messages: "No information of status!",
        });
      } else {
        return res.status(200).json({
          status: 200,
          messages: "You have a litle information of status!",
          data: result,
        });
      }
    } catch (error) {
      res.status.json({
        status: 503,
        messages: "Errors connect server!",
      });
    }
  }

  async editSupplier(req, res, next) {
    let id = req.params.id;

    let data = await Suppliers.getSupplierById(id);

    if (data) {
      return await template.showJson(res, 200, {
        status: 200,
        messages: " Get supplier success!",
        data: data,
      });
    } else {
      return await template.showJson(res, 404, {
        stauts: 404,
        messages: "Get supplier unsuccess!",
      });
    }
  }

  async updateSupplier(req, res, next) {
    let id = req.params.id;
    let dataForm = await template.getRequest(req);

    const errors = await mess.showValidations(400, req, res, next);
    if (!errors.isEmpty()) {
      return res.json({
        error: "Validations errors!",
        status: 400,
        messages: errors.array(),
      });
    }

    let supplier = await Suppliers.getSupplierById(id);

    if (supplier) {
      let updateAT = Date.now();
      let data = { ...dataForm, updatedAt: updateAT };
      let update = await Suppliers.updateSupplier(id, data);

      if (update) {
        return await template.showJson(res, 200, {
          status: 200,
          messages: "Update supplier success!",
          data: await Suppliers.getSupplierById(id),
        });
      } else {
        return await template.showJson(res, 404, {
          status: 404,
          messages: "Update supplier unsuccess!",
        });
      }
    } else {
      return await template.showJson(res, 404, {
        status: 404,
        messages: "Get supplier unsuccess!",
      });
    }
  }

  async deleteSupplier(req, res, next) {
    let id = req.params.id;
    let data = await Suppliers.getSupplierById(id);
    let deleteSupplier = await Suppliers.deleteSupplier(id);
    if (deleteSupplier) {
      return await template.showJson(res, 200, {
        status: 200,
        messages: "Delete supplier success!",
        data: data,
      });
    } else {
      return await template.showJson(res, 404, {
        status: 404,
        messages: "Delete supplier unsuccess!",
      });
    }
  }
}

module.exports = new SupplierController();
