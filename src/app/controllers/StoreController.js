const { Stores } = require("../models/Store.js");
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

const autoRenderCoder = async (status = true, startCode = "N", table) => {
  if ((status = true)) {
    const dateNow = Date.now();
    const date = new Date(dateNow);
    let getDay = date.getDate();
    let getMonth = date.getMonth() + 1;
    let getYear = date.getFullYear();
    let numberGrow = "00000";

    let dayZeroToTen = "0";
    let day = getDay;
    let month = getMonth;
    if (getDay < 10) {
      let day = dayZeroToTen + getDay;
      if (getMonth < 10) {
        let month = dayZeroToTen + getMonth;
      }
    }

    let number = numberGrow + 1;
    let code = startCode + day + month + getYear + number;
    let codeCurrent = await table.checkCodeIsUnique(code);

    if (codeCurrent == false) {
      return code;
    } else {
      let codeChange = codeCurrent;
      let numberPlus = codeChange.slice(-6);
      let codeStart = codeChange.slice(0, -6);
      let not = "00000";

      if (Number(numberPlus) + 1 >= 10) {
        not = "0000";
      } else if (Number(numberPlus) + 1 >= 100) {
        not = "000";
      } else if (Number(numberPlus) + 1 >= 1000) {
        not = "00";
      } else if (Number(numberPlus) + 1 >= 10000) {
        not = "0";
      } else if (Number(numberPlus) + 1 >= 100000) {
        not = "";
      } else if (Number(numberPlus) + 1 < 10) {
        not = "00000";
      }

      code = codeStart + not + (Number(numberPlus) + 1);
      return code;
    }
  } else {
    return "";
  }
};

class StoreController {
  async createStore(req, res, next) {
    //Xử lý nhập dữ liệu:
    const errors = await mess.showValidations(400, req, res, next);
    if (!errors.isEmpty()) {
      const info = {
        data: errors.array(),
        status: 400,
        messages: "Validations errors!",
      };
      return res.json(info);
    }

    // //Nếu không có lỗi nhập dữ liệu thì lưu dữ lệu lại.
    let { imageStore, ...formData } = req.body;
    let image = [];
    if (req.files.length == 0 || !req.files) {
      image = [];
    } else {
      const imageIs = req.files;
      imageIs.map((data, index) => {
        image.push({ nameImage: destination + data.filename });
      });
    }
    let data = await Stores.createStore({ imageStore: image, ...formData });

    if (data.length > 0 || data) {
      return res.status(200).json({
        status: 200,
        messages: "Create success!",
        data: data,
      });
    } else {
      return res.status(404).json({
        status: 404,
        messages: "Create unsuccess!",
      });
    }
  }

  async editStore(req, res, next) {
    let id = req.params.id;
    let data = await Stores.getStoreById(id);
    if (data) {
      template.showJson(res, 200, {
        status: 200,
        messages: "Get informations success!",
        data: data,
      });
    } else {
      let info = {
        status: 404,
        messages: "Get informations unsuccess!",
      };
      template.showJson(res, 200, info);
    }
  }

  async getAllStore(req, res, next) {
    const page = Math.max(0, req.params.page);
    const limit = req.params.limit;

    let data = await Stores.getAllStores(page, limit);
    if (data) {
      return res.status(200).json({
        status: 200,
        messages: "Get informations success!",
        data: data,
      });
    } else {
      return res.status(404).json({
        status: 404,
        messages: "Get informations unsuccess!",
      });
    }
  }

  async updateStore(req, res, next) {
    let id = req.params.id;
    let dataForm = req.body;
    let files = req.files;

    //Xử lý nhập dữ liệu:
    const errors = await mess.showValidations(400, req, res, next);
    if (!errors.isEmpty()) {
      const info = {
        data: errors.array(),
        status: 400,
        messages: "Validations errors!",
      };

      return await template.showJson(res, 400, info);
    }

    let getPost = await Stores.getStoreById(id);
    if (getPost || getPost.length > 0) {
      if (!files || files.length <= 0) {
        const { imageStore, ...value } = dataForm;
        const items = await Stores.updateOne(
          { _id: id },
          { ...value, updatedAt: Date.now() }
        );
        if (!items) {
          return res.json({
            status: 404,
            messages: "Update post unsuccesfully!",
          });
        } else {
          return res.json({
            status: 200,
            messages: "Update post succesfully!",
            infor: items,
            data: await Stores.getStoreById(id),
          });
        }
      } else {
        const image = files;
        let imageProduct = [];
        let { imageStore, ...value } = dataForm;
        const items = await Stores.updateOne(
          { _id: id },
          { ...value, updatedAt: Date.now() }
        );

        image.map((data, index) => {
          imageProduct.push({ nameImage: destination + data.filename });
        });
        await Stores.updateOne(
          { _id: req.params.id },
          { $push: { imageStore: imageProduct } }
        );

        if (!items) {
          return res.json({
            status: 404,
            messages: "Update store unsuccesfully!",
          });
        } else {
          return res.json({
            status: 200,
            messages: "Update store succesfully!",
            infor: items,
            data: await Stores.getStoreById(id),
          });
        }
      }
    } else {
      return res.status(404).json({
        status: 404,
        messages: "Update store unsuccess!",
      });
    }
  }

  async deleteStore(req, res, next) {
    let id = req.params.id;
    let data = await Stores.getStoreById(id);
    if (data) {
      if (data.imageStore.length > 0) {
        data.imageStore.map((data, index) => {
          fs.exists("uploads" + data.nameImage, function (exists) {
            if (exists) {
              fs.unlinkSync("uploads" + data.nameImage);
            }
          });
        });
      }

      await Stores.deleteStore(id);

      template.showJson(res, 200, {
        status: 200,
        messages: "Delete store success!",
        data: data,
      });
    } else {
      template.showJson(res, 404, {
        status: 404,
        messages: "Delete store unsuccess!",
      });
    }
  }
}

module.exports = new StoreController();
