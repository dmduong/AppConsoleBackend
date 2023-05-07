const jwt = require("jsonwebtoken");
const User = require("../models/Users.js");
const template = require("../../helpers/template.js");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    const user = await User.findOne({
      _id: data._id,
      storeId: data._store,
      "tokens.token": token,
    }).populate([{ path: "storeId", select: "_id codeStore nameStore imageStore" }]);

    if (!user) {
      return res.json({
        status: 403,
        messages: "Token không tồn tại",
      });
    } else {
      req.user = user;
      req.token = token;
      req.store = data._store;
      next();
    }
  } catch (error) {
    res.json({
      status: 401,
      messages: "Không thể kết nối đến máy chủ!",
    });
  }
};
module.exports = auth;
