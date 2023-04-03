const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config();

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  refreshTokens: [
    {
      refreshToken: {
        type: String,
        required: true,
      },
    },
  ],
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
  },
});

userSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign(
    { _id: user._id, _store: user.storeId },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "365d",
    }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.generateAuthRefreshToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const refreshToken = jwt.sign(
    { _id: user._id, _store: user.storeId },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
  user.refreshTokens = user.refreshTokens.concat({ refreshToken });
  await user.save();
  return refreshToken;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email }).populate([
    { path: "storeId", select: "_id codeStore nameStore imageStore" },
  ]);
  if (!user) {
    throw new Error({ messages: "Invalid login credentials" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ messages: "Invalid login credentials" });
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
