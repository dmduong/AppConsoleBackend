const mongoose = require("mongoose");
const { post } = require("../../routes/post");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    codeOrder: {
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
