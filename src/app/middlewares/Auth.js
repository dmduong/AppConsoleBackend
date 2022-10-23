const jwt = require("jsonwebtoken");
const User = require("../models/Users.js");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    const user = await User.findOne({
      _id: data._id,
      storeId: data._store,
      "tokens.token": token,
    });
    if (!user) {
      return res.json({
        status: 403,
        messages: "Token is not valid!",
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
      messages: "Not authorized to access this resource!",
    });
  }
};
module.exports = auth;
