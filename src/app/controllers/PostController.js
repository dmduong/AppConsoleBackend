const { Category, Status, Unit, Products } = require("../models/Inventory.js");
const { Posts } = require("../models/Post.js");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose.js");
const mess = require("../../messages/messagesFollowsStatus");
const upload = require("../middlewares/Auth");
const Resize = require("../../util/Resize");
const destination = "/images/posts/";
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { publicDecrypt } = require("crypto");
const { post } = require("../../routes/post.js");
const { options } = require("joi");

const autoRenderCoder = async (status = true, startCode = "N", table) => {
  if ((status = true)) {
    const dateNow = Date.now();
    const date = new Date(dateNow);
    let getDay = date.getDate();
    let getMonth = date.getMonth() + 1;
    let getYear = date.getFullYear();
    let numberGrow = "00000";

    let dayZeroToTen = "0";
    let day = getDay;
    let month = getMonth;
    if (getDay < 10) {
      let day = dayZeroToTen + getDay;
      if (getMonth < 10) {
        let month = dayZeroToTen + getMonth;
      }
    }

    let number = numberGrow + 1;
    let code = startCode + day + month + getYear + number;
    let codeCurrent = await table.checkCodeIsUnique(code);

    if (codeCurrent == false) {
      return code;
    } else {
      let codeChange = codeCurrent;
      let numberPlus = codeChange.slice(-6);
      let codeStart = codeChange.slice(0, -6);
      let not = "00000";

      if (Number(numberPlus) + 1 >= 10) {
        not = "0000";
      } else if (Number(numberPlus) + 1 >= 100) {
        not = "000";
      } else if (Number(numberPlus) + 1 >= 1000) {
        not = "00";
      } else if (Number(numberPlus) + 1 >= 10000) {
        not = "0";
      } else if (Number(numberPlus) + 1 >= 100000) {
        not = "";
      } else if (Number(numberPlus) + 1 < 10) {
        not = "00000";
      }

      code = codeStart + not + (Number(numberPlus) + 1);
      return code;
    }
  } else {
    return "";
  }
};

class PostController {
  async storePosts(req, res, next) {
    try {
      //Xử lý nhập dữ liệu:
      const errors = await mess.showValidations(400, req, res, next);
      if (!errors.isEmpty()) {
        return res.json({
          data: errors.array(),
          status: 400,
          messages: "Validations errors!",
        });
      }

      //Nếu không có lỗi nhập dữ liệu thì lưu dữ lệu lại.
      let { imagePost, ...formData } = req.body;
      let image = [];
      if (req.files.length == 0 || !req.files) {
        image = [];
      } else {
        const imageIs = req.files;
        imageIs.map((data, index) => {
          image.push({ nameImage: destination + data.filename });
        });
      }

      /**render code post */
      const codePost = await autoRenderCoder(true, "POST", Posts);
      const value = {
        codePost: codePost,
        imagePost: image,
        ...formData,
      };
      const post = await Posts.addPost(value);
      return res.status(200).json({
        status: 200,
        messages: "Create success!",
        data: post,
      });
    } catch (error) {
      console.log(error);
      return res.status(503).json({
        status: 503,
        messages: "Errors connect server!",
        err: error,
      });
    }
  }

  async getAllPosts(req, res, next) {
    try {
      let post = await Posts.getAllInfoPost();
      if (post.length > 0) {
        return res.status(200).json({
          status: 200,
          messages: "Get informations success!",
          data: post,
        });
      } else {
        return res.status(404).json({
          status: 404,
          messages: "Get informations unsuccess!",
        });
      }
    } catch (error) {
      return res.status(503).json({
        status: 503,
        messgaes: "Connect to sever fail!",
        error: error,
      });
    }
  }

  async editPost(req, res, next) {
    let idPost = req.params.id;
    let post = await Posts.getInforById(idPost);
    if (post.length > 0 || post) {
      return res.status(200).json({
        status: 200,
        messages: "Get informations success!",
        data: post,
      });
    } else {
      return res.status(404).json({
        status: 404,
        messgaes: "Get information unsuccess!",
      });
    }
  }

  async updatePosts(req, res, next) {
    let id = req.params.id;
    let dataForm = req.body;
    let files = req.files;

    //Xử lý nhập dữ liệu:
    const errors = await mess.showValidations(400, req, res, next);
    if (!errors.isEmpty()) {
      return res.json({
        data: errors.array(),
        status: 400,
        messages: "Validations errors!",
      });
    }

    let getPost = await Posts.getInforById(id);
    if (getPost || getPost.length > 0) {
      if (!files || files.length <= 0) {
        const { imagePost, ...value } = dataForm;
        const items = await Posts.updateOne(
          { _id: id },
          { ...value, updatedAt: Date.now() }
        );
        if (!items) {
          return res.json({
            status: 404,
            messages: "Update post unsuccesfully!",
          });
        } else {
          return res.json({
            status: 200,
            messages: "Update post succesfully!",
            infor: items,
            data: await Posts.getInforById(id),
          });
        }
      } else {
        const image = files;
        let imageProduct = [];
        let { imagePost, ...value } = dataForm;
        const items = await Posts.updateOne(
          { _id: id },
          { ...value, updatedAt: Date.now() }
        );

        image.map((data, index) => {
          imageProduct.push({ nameImage: destination + data.filename });
        });
        await Posts.updateOne(
          { _id: req.params.id },
          { $push: { imagePost: imageProduct } }
        );

        if (!items) {
          return res.json({
            status: 404,
            messages: "Update post unsuccesfully!",
          });
        } else {
          return res.json({
            status: 200,
            messages: "Update post succesfully!",
            infor: items,
            data: await Posts.getInforById(id),
          });
        }
      }
    } else {
      return res.status(404).json({
        status: 404,
        messages: "Update post unsuccess!",
      });
    }
  }

  async deletePost(req, res, next) {
    let id = req.params.id;
    let data = await Posts.getInforById(id);

    if (data || data.length > 0) {
      if (data.imagePost.length > 0) {
        data.imagePost.map((data, index) => {
          fs.exists("uploads" + data.nameImage, function (exists) {
            if (exists) {
              fs.unlinkSync("uploads" + data.nameImage);
            }
          });
        });
      }

      await Posts.deletePost(id);

      res.status(200).json({
        status: 200,
        messages: "Delete post succesfully!",
        data: id,
      });
    } else {
      res.status(404).json({
        status: 404,
        messages: "Delete post unsuccesfully!",
      });
    }
  }
}

module.exports = new PostController();
