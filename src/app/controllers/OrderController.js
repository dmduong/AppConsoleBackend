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
const { pagination, load, updateOne } = require("../../config/mongoDB");
const {emptyArray, addErrors} = require("../../helpers/util");
const utils = require("../../helpers/util");
const { Products } = require("../models/Inventory");

class OrderController {
  async storeOrder(req, res, next) {
    let { orderDetail, ...dataFormForOrder } = await template.getRequest(req);
    let storeId = await template.storeIdGetFromToken(req);
    let getUser = await template.userGetFromToken(req);

    //Xử lý nhập dữ liệu:
    const errors = await mess.showValidations(400, req, res, next);
    if (!errors.isEmpty()) {
      return res.json({
        data: "Validations errors!",
        status: 400,
        messages: errors.array(),
      });
    }

    let data = await Orders.storeOrder(
      { ...dataFormForOrder, storeId: storeId },
      orderDetail
    );

    if (data) {
      return await template.showJson(res, 200, {
        status: 200,
        messages: "Thêm thông tin thành công.",
        data: data,
      });
    } else {
      return await template.showJson(res, 404, {
        status: 404,
        messages: "Thêm thông tin không thành công.",
      });
    }

    return await template.showJson(res, 200, { data: orderDetail });
  }

  async getOrder (req, res, next) {
    try {
      let storeId = await template.storeIdGetFromToken(req);
      const page = Math.max(0, req.params.page);
      const limit = req.params.limit;
      let limit1 = limit;
      let page1 = limit * page;
      let sort = { createdAt: "desc" };
      let total = await load("", Orders, { storeId: storeId});
      let data = await load("", Orders, {storeId: storeId}, [
        { path: "statusId", select: "_id codeStatus nameStatus" },
        { path: "storeId", select: "_id codeStore nameStore" },
        { path: "userId", select: "_id name" },
      ], limit1, page1, sort);
      let valuePagi = await pagination(page, limit, total, data);
  
      let header_new = [
        { key: "_id", value: "_id" },
        { key: "codeOrder", value: "Mã đơn hàng" },
        { key: "titleOrder", value: "Chi tiết" },
        { key: "totalAmount", value: "Giá" },
        { key: "paymentAmount", value: "Thanh toán" },
        { key: "paymentRemain", value: "Giá còn lại" },
        { key: "paymentDate", value: "Ngày thanh toán" },
        { key: "isPayment", value: "Trạng thái thanh toán" },
        { key: "userId", value: "Nhân viên" },
        { key: "statusId", value: "Trạng thái" },
        { key: "storeId", value: "Cửa hàng" },
        { key: "createdAt", value: "Ngày thêm" },
        { key: "updatedAt", value: "Ngày cập nhật" },
      ];
  
      let dataNew = new Array();
      data.map((value, keys) => {
        const createdAt = utils.timeToString(value.createdAt);
        const updatedAt = utils.timeToString(value.updatedAt);
        const paymentDate = utils.timeToString(value.paymentDate);
        dataNew[keys] = Array(
          { key: "_id", value: value._id },
          { key: "codeOrder", value: value.codeOrder },
          { key: "titleOrder", value: value.titleOrder },
          { key: "totalAmount", value: value.totalAmount },
          { key: "paymentAmount", value: value.paymentAmount },
          { key: "paymentRemain", value: value.paymentRemain },
          { key: "paymentDate", value: paymentDate },
          { key: "isPayment", value: value.isPayment },
          { key: "userId", value: value.userId.name },
          { key: "statusId", value: value.statusId.nameStatus },
          { key: "storeId", value: value.storeId.nameStore },
          { key: "createdAt", value: createdAt },
          { key: "updatedAt", value: updatedAt },
        );
      });
  
      return res.json({
        status: 200,
        messages: "Lấy thông tin thành công.",
        pagination: valuePagi,
        data: new Array(dataNew, header_new)
      });
    } catch (error) {
      return res.json({
        status: 500,
        messages: "Lấy thông tin không thành công."
      });
    }
  }

  async orderDetail (req, res, next) {
    try {
      const idOrder = req.params.id;
      const data = await OrderDetails.getDetail(idOrder);
      if (data.length == 0) {
        return res.json(
          {
            status: 403,
            messages: 'Không có dữ liệu.',
            data: data
          }
        );
      }
      return res.json(
        {
          status: 200,
          messages: 'Lấy thông tin thành công.',
          data: data
        }
      );
    } catch (error) {
      return res.status(500).json({
        status: 500,
        err: error,
        messages: "Lấy thông tin không thành công."
      });
    }
  }

  async getInforOrder (req, res, next) {
    try {
      const idOrder = req.params.id;
      const data = await Orders.getInfoById(idOrder);
      return res.json({
        status: 200,
        messages: 'Lấy thông tin thành công.',
        data: data
      });
    } catch (error) {
      return res.json({
        status: 500,
        messages: "Không thể kết nối đến máy chủ"
      });
    }
  }

  async updateOrder (req, res, next) {
    try {
      const id = req.params.id;
      const formData = req.body;
  
      const errors = await mess.showValidations(400, req, res, next);
      if (!errors.isEmpty()) {
        return res.json({
          error: "Validations errors!",
          status: 400,
          messages: errors.array(),
        });
      }

      let update = await updateOne({...formData}, Orders, {_id: id}); 

      if (update) {
        return res.json({
          status: 200,
          messages: 'Cập nhật thành công.',
        });
      } else {
        return res.json({
          status: 403,
          messages: 'Cập nhật không thành công.',
        });
      }
    } catch (error) {
      return res.json({
        status: 500,
        messages: "Không thể kết nối đến máy chủ."
      });
    }
  }

  async deleteOrder (req, res, next) {
    try {
      let id = req.params.id;
      let result = await Orders.getInfoById(id);
      if (result[0].isPayment) {
        return res.json({
          status: 404,
          messages: "Không thể xóa hóa đơn đã thanh toán."
        });
      }
      if (!emptyArray(result)) {
        await Orders.deleteOneOrder(id);
        let list_order_detail = await OrderDetails.getDetail(id);
        if (list_order_detail) {
          list_order_detail.map(async (value, index) => {
            await OrderDetails.deleteOrderDetail(value._id);
          });
        }
        return res.json({
          status: 200, 
          messages: 'Xóa dữ liệu thành công.'
        });
      } else {
        return res.json({
          status: 404, 
          messages: 'Xóa dữ liệu không thành công.'
        });
      }
    } catch (error) {
      return res.json({
        status: 403,
        messages: "Xóa dữ liệu không thành công 1."
      });
    }
  }

  async payment (req, res, next) {
    try {
      let datePayment = req.body.paymentDate;
      let list_id = req.body.params;
      if (!emptyArray(list_id)) {
        list_id.map(async (value, index) => {
          //Lấy thông tin sản phẩm đã mua, cập nhật lại số lượng.
          let tt_order_detail = await OrderDetails.getDetail(value._id);
          if (!emptyArray(tt_order_detail)) {
            tt_order_detail.map(async (v,k) => {
              let id_product = v.productId._id;
              let amount = v.amount;
              let so_tien = v.totalAmount;
              await updateOne({
                amountProduct: amount,priceProduct: so_tien
              }, Products, {_id: id_product});
            });
          }

          await updateOne({paymentDate: datePayment,isPayment: true}, Orders, {_id: value._id});
        });

        return res.json({
          status: 200,
          messages: "Thành toán thành công."
        });
      } else {
        return res.json({
          status: 403,
          messages: "Thành toán không thành công."
        });
      }
    } catch (error) {
      return res.json({
        status: 403,
        messages: "Không thể thanh toán thành công."
      });
    }
  }
}

module.exports = new OrderController();
