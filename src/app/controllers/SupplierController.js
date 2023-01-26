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

class SupplierController {
  async storeSupplier(req, res, next) {
    let getIdStore = await template.storeIdGetFromToken(req);
    let dataForm = await template.getRequest(req);

    const errors = await mess.showValidations(400, req, res, next);
    if (!errors.isEmpty()) {
      return res.json({
        error: "Validations errors!",
        status: 400,
        messages: errors.array(),
      });
    }

    let data = { ...dataForm, storeId: getIdStore };

    let result = await Suppliers.createSupplier(data);

    if (result) {
      return await template.showJson(res, 200, {
        status: 200,
        messages: "Create success!",
        data: result,
      });
    } else {
      return await template.showJson(res, 404, {
        status: 404,
        messages: "Create unsuccess!",
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
        messages: "Get supplier success!",
        data: data,
      });
    } else {
      return await template.showJson(res, 404, {
        status: 404,
        messages: "Get supplier unsuccess!",
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
        data: errors.array(),
        status: 400,
        messages: "Validations errors!",
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
