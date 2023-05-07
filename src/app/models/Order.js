const { string } = require("joi");
const mongoose = require("mongoose");
const { OrderDetails } = require("../models/OrderDetail");
const { load, deleteOne } = require("../../config/mongoDB");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    codeOrder: {
      type: String,
      minLength: 1,
      maxLength: 255,
      unique: true,
      uppercase: true,
    },
    titleOrder: {
      type: String,
      minLength: 1,
      maxLength: 500,
      default: null,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    paymentAmount: {
      type: Number,
      default: 0,
    },
    paymentRemain: {
      type: Number,
      default: 0,
    },
    paymentDate: {
      type: String,
      default: Date.now(),
    },
    isPayment: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stores",
    },
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: Date.now },
  },
  {
    timestamps: false,
  }
);

const table = OrderSchema;

table.statics.storeOrder = async (dataFormForOrder, dataFormForDetail) => {
  try {
    let dataOrder = new Orders(dataFormForOrder);
    await dataOrder.save();

    if (!dataOrder) {
      return false;
    }

    let inserDetail = await OrderDetails.storeDetail(
      dataFormForDetail,
      dataOrder._id
    );

    // console.log([...inserDetail]);
    let result = { dataOrder, inserDetail };
    return result ? result : false;
  } catch (error) {
    return console.log(error);
  }
};

table.statics.getInfoById = async (idOrder) => {
  let fields = "";
  let populate = [
    { path: 'userId', select: "name"},
    { path: 'storeId', select: "codeStore nameStore"},
    { path: 'statusId', select: "codeStatus nameStatus"},
  ];
  let where = { _id : idOrder};
  let data = await load(fields, Orders, where, populate);
  return data;
};

table.statics.deleteOneOrder = async (id) => {
  try {
    let where = {_id: id};
    let table = Orders;
    let result = await deleteOne(where, table);
    return result;
  } catch (error) {
    return false;
  }
}

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = { Orders };
