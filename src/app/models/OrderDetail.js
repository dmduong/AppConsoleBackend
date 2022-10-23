const { string } = require("joi");
const mongoose = require("mongoose");
const { post } = require("../../routes/post");
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

const OrderDetails = mongoose.model("OrderDetails", OrderDetailSchema);

module.exports = { OrderDetails };
