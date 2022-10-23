const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StatusSchema = new Schema(
  {
    codeStatus: {
      type: String,
      minLength: 1,
      maxLength: 255,
      unique: true,
    },
    nameStatus: {
      type: String,
      minLength: 1,
      maxLength: 255,
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

const CategorySchema = new Schema(
  {
    codeCategory: {
      type: String,
      minlength: 1,
      maxlength: 255,
      unique: true,
    },
    nameCategory: {
      type: String,
      minlength: 1,
      maxlength: 255,
    },
    detailCategory: {
      type: String,
      minlength: 1,
      maxlength: 600,
    },
    status: {
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

const UnitSchema = new Schema(
  {
    codeUnit: {
      type: String,
      minlength: 1,
      maxlength: 255,
      unique: true,
    },
    nameUnit: {
      type: String,
      minlength: 1,
      maxlength: 255,
    },
    detailUnit: {
      type: String,
      minlength: 1,
      maxlength: 600,
    },
    status: {
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

const ProductSchema = new Schema(
  {
    codeProduct: {
      type: String,
      minlength: 1,
      maxlength: 255,
      unique: true,
    },
    nameProduct: {
      type: String,
      minlength: 1,
      maxlength: 255,
      default: null,
    },
    amountProduct: {
      type: Number,
      default: null,
    },
    detailProduct: {
      type: String,
      default: null,
    },
    imageProduct: [
      {
        nameImage: {
          type: String,
          default: null,
        },
      },
    ],
    priceProduct: {
      type: Number,
      default: null,
    },
    priceSellProduct: {
      type: Number,
      default: null,
    },
    weightProduct: {
      type: Number,
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
    status: {
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

const Category = mongoose.model("Category", CategorySchema);
const Status = mongoose.model("Status", StatusSchema);
const Unit = mongoose.model("Unit", UnitSchema);
const Products = mongoose.model("Products", ProductSchema);

module.exports = { Category, Status, Unit, Products };
