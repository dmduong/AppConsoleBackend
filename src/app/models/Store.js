const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    codeStore: {
      type: String,
      minLength: 1,
      maxLength: 255,
      unique: true,
      uppercase: true,
    },
    nameStore: {
      type: String,
      minLength: 1,
      maxLength: 100,
    },
    addressStore: {
      type: String,
      minLength: 1,
      default: null,
    },
    phoneStore: {
      type: String,
      minLength: 1,
      maxLength: 11,
      unique: true,
    },
    imageStore: [
      {
        nameImage: {
          type: String,
          default: null,
        },
      },
    ],
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
    },
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: Date.now },
  },
  {
    timestamps: false,
  }
);

StoreSchema.statics.createStore = async (dataForm) => {
  try {
    const data = new Stores(dataForm);
    await data.save();
    return data;
  } catch (error) {
    return error;
  }
};

StoreSchema.statics.getAllStores = async (page, limit) => {
  try {
    const count = await Stores.find({});
    const result = await Stores.find({})
      .limit(limit)
      .skip(limit * page)
      .sort({
        codeProduct: "asc",
      })
      .populate({ path: "statusId", select: "_id codeStatus nameStatus" });

    let data = {
      pagination: {
        page: page,
        pages: Math.ceil(count.length / limit),
        limit: limit,
      },
      data: result,
    };

    return result ? data : [];
  } catch (error) {
    return console.log(error);
  }
};

StoreSchema.statics.getStoreById = (id) => {
  try {
    let data = Stores.findById(id).populate({
      path: "statusId",
      select: "_id codeStatus nameStatus",
    });

    return data ? data : false;
  } catch (error) {
    return console.log(error);
  }
};

StoreSchema.statics.deleteStore = async (id) => {
  try {
    await Stores.deleteOne({ _id: id });
    return 1;
  } catch (error) {
    return 0;
  }
};

const Stores = mongoose.model("Stores", StoreSchema);

module.exports = { Stores };
