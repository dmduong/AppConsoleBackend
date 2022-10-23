const mongoose = require("mongoose");
const { post } = require("../../routes/post");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    codePost: {
      type: String,
      minLength: 1,
      maxLength: 255,
      unique: true,
      uppercase: true,
    },
    namePost: {
      type: String,
      minLength: 1,
      maxLength: 255,
    },
    contentPost: {
      type: String,
      minLength: 1,
    },
    imagePost: [
      {
        nameImage: {
          type: String,
          default: null,
        },
      },
    ],
    colorPost: {
      type: String,
      minLength: 1,
      maxLength: 255,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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

/**
 *
 * @author minhduong 16/10/2022
 * @param {*} {codePost}
 * @returns codePost last insert
 */
PostSchema.statics.checkCodeIsUnique = async function (codePost) {
  const postLast = await Posts.findOne({ codePost: codePost });
  let codeCurrent = "";
  if (postLast) {
    const lastIndexPost = await Posts.findOne({})
      .sort({ field: "asc", _id: -1 })
      .limit(1);
    codeCurrent = lastIndexPost._doc.codePost;
  } else {
    codeCurrent = false;
  }
  return codeCurrent;
};

/**
 * @author minh duong 16/10/2022
 * @returns Get all informations post
 */
PostSchema.statics.getAllInfoPost = async function () {
  try {
    const data = await Posts.find({}).populate([
      { path: "userId", select: "_id name email" },
      { path: "statusId", select: "_id codeStatus nameStatus" },
    ]);

    return data ? data : [];
  } catch (error) {
    return error;
  }
};

/**
 * @todo Add new post
 * @author minh duong 16/10/2022
 * @returns post new
 * @param object
 */

PostSchema.statics.addPost = async (fromData) => {
  try {
    const postNew = new Posts(fromData);
    await postNew.save();

    return postNew;
  } catch (error) {
    return error;
  }
};

/**
 * @author minh duong 22/10/2022
 * @param {*} id
 * @todo Get infor post by id
 */

PostSchema.statics.getInforById = async (id) => {
  try {
    const data = await Posts.findById(id).populate([
      { path: "userId", select: "_id name email" },
      { path: "statusId", select: "_id codeStatus nameStatus" },
    ]);

    return data ? data : [];
  } catch (error) {
    return error;
  }
};

/**
 * @todo get informations by code
 * @author minh duong 22/10/2022
 * @param {*} code
 */

PostSchema.statics.getInforByCode = async (code) => {
  try {
    const data = await Posts.findOne({ codePost: code }).populate([
      { path: "userId", select: "_id name email" },
      { path: "statusId", select: "_id codeStatus nameStatus" },
    ]);

    return data._doc ? data._doc : [];
  } catch (error) {
    return error;
  }
};

/**
 * @author minhduong 22/10/2022
 * @todo Delete post
 * @params idPost
 */

PostSchema.statics.deletePost = async (id) => {
  try {
    await Posts.deleteOne({ _id: id });
    return 1;
  } catch (error) {
    return 0;
  }
};

const Posts = mongoose.model("Posts", PostSchema);

module.exports = { Posts };
