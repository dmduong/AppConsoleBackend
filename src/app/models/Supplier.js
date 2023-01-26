/**
 * @author minh duong 22/10/2022
 * @todo Model Supplier
 */

const mongoose = require("mongoose");
const { post } = require("../../routes/post");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema(
  {
    codeSupplier: {
      type: String,
      minLength: 1,
      maxLength: 255,
      unique: true,
      uppercase: true,
    },
    nameSupplier: {
      type: String,
      minLength: 1,
      maxLength: 255,
    },
    addressSupplier: {
      type: String,
      minLength: 1,
      maxLength: 500,
    },
    phoneSupplier: {
      type: String,
      minLength: 1,
      maxLength: 11,

      unique: true,
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

const table = SupplierSchema;

/**
 * @author minh duong 23/10/2022
 * @todo Add supplier
 */

table.statics.createSupplier = async (dataForm) => {
  try {
    let data = new Suppliers(dataForm);
    await data.save();

    return data ? data : false;
  } catch (error) {
    return console.log(error);
  }
};

table.statics.getSupplierById = async (id) => {
  try {
    let data = await Suppliers.findById(id).populate([
      { path: "statusId", select: "_id codeStatus nameStatus" },
      { path: "storeId", select: "_id codeStore nameStore" },
    ]);

    return data ? data : false;
  } catch (error) {
    return console.log(error);
  }
};

table.statics.getAllSupplier = async (store, page, limit) => {
  try {
    const count = await Suppliers.find({ storeId: store });
    const result = await Suppliers.find({ storeId: store })
      .limit(limit)
      .skip(limit * page)
      .sort({ createdAt: "desc" })
      .populate([
        { path: "statusId", select: "_id codeStatus nameStatus" },
        { path: "storeId", select: "_id codeStore nameStore" },
      ]);

    let data = {
      pagination: {
        page: page,
        pages: Math.ceil(count.length / limit),
        limit: limit,
        total: count.length,
        dataOfPage: result.length,
      },
      data: result,
    };

    return result ? data : false;
  } catch (error) {
    return console.log(error);
  }
};

table.statics.deleteSupplier = async (id) => {
  try {
    let data = await Suppliers.deleteOne({ _id: id });
    return data ? true : false;
  } catch (error) {
    return console.log(error);
  }
};

table.statics.updateSupplier = async (id, dataForm) => {
  try {
    let data = await Suppliers.updateOne({ _id: id }, dataForm);
    return data ? true : false;
  } catch (error) {
    return console.log(error);
  }
};

const Suppliers = mongoose.model("Suppliers", SupplierSchema);

module.exports = { Suppliers };
