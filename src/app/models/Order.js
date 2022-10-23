const { string } = require("joi");
const mongoose = require("mongoose");
const { post } = require("../../routes/post");
const { OrderDetails } = require("../models/OrderDetail");
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

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = { Orders };
