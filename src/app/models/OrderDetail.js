const { string } = require("joi");
const mongoose = require("mongoose");
const { load, deleteOne } = require("../../config/mongoDB");
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema(
  {
    amount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    titleOrderDetail: {
      type: String,
      default: null,
      maxLength: 500,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  },
  {
    timestamps: false,
  }
);

const table = OrderDetailSchema;

table.statics.storeDetail = async (dataFormDetail, id) => {
  try {
    let saveDetail = [];
    dataFormDetail.map(async (value, index) => {
      console.log(value);
      let insert = new OrderDetails({ ...value, orderId: id });
      await insert.save();
      saveDetail.push(insert);
    });

    return saveDetail ? saveDetail : false;
  } catch (error) {
    return console.log(error);
  }
};

table.statics.getDetail = async (idOrder) => {
  let fields = "";
  let populate = [
    { path: 'productId', select: "codeProduct nameProduct"},
    { path: 'orderId', select: "codeOrder titleOrder"},
  ];
  let where = {orderId : idOrder};
  let data = await load(fields, OrderDetails, where, populate);
  return data;
};

table.statics.deleteOrderDetail = async (id) => {
  let table = OrderDetails;
  let where = {_id: id};
  let result = await deleteOne(where, table);
  return result;
}

const OrderDetails = mongoose.model("OrderDetails", OrderDetailSchema);

module.exports = { OrderDetails };
