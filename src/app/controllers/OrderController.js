const { Orders } = require("../models/Order");
const { OrderDetails } = require("../models/OrderDetail");
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

class OrderController {
  async storeOrder(req, res, next) {
    let { orderDetail, ...dataFormForOrder } = await template.getRequest(req);
    let storeId = await template.storeIdGetFromToken(req);
    let getUser = await template.userGetFromToken(req);

    let data = await Orders.storeOrder(
      { ...dataFormForOrder, storeId: storeId },
      orderDetail
    );

    if (data) {
      return await template.showJson(res, 200, {
        status: 200,
        messages: "Store order success!",
        data: data,
      });
    } else {
      return await template.showJson(res, 404, {
        status: 404,
        messages: "Store order unsuccess!",
      });
    }

    return await template.showJson(res, 200, { data: orderDetail });
  }
}

module.exports = new OrderController();
