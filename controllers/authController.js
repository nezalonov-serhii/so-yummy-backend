const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { SECRET_KEY } = process.env;

const { ctrlWrapper } = require("../helpers/index");

const storeImage = path.resolve("public", "avatars");
const { uploadImage, updateLoadedImage } = require("../helpers/cloudinary");

const userRegistration = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = await gravatar.url(email, { s: "200" });
  //   const verificationCode = await nanoid();
  try {
    const newUser = await User.create({
      ...req.body,
      avatarURL: avatar,
      password: hashPassword,
      //   verificationCode,
    });
    const { id } = newUser;
    const payload = { id: newUser._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });
    // const verifyData = {
    //   to: newUser.email,
    //   subject: "Please, confirm your email",
    //   html: `<p>Please, confirm your email ${newUser.email} by click on <a href="localhost:60000/api/v1/users/verify/${newUser.verificationCode}">this link</a></p>`,
    // };
    // sendEmail(verifyData);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
        email: newUser.email,
        avatarURL: newUser.avatarURL,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401);
  }
  // if (!user.isValidated) {
  //   throw HttpError(401, "Validate your email");
  // }
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw HttpError(401);
  }
  const { id } = user;
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token,
  });
};

const userLogout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const userCurrent = async (req, res, next) => {
  const { id } = req.user;
  const currentUser = await User.findById(id);
  res.json(currentUser);
};

const userUpdateAvatar = async (req, res, next) => {
  const { id } = req.user;
  const { path: temporaryName, filename: newFileName } = req.file;
  const { name } = req.body;

  //   const fileName = path.join(storeImage, newFileName);

  try {
    const user = await User.findById(id);
    let result = null;
    if (user.avatar) {
      const { public_id } = user.avatar;

      result = await updateLoadedImage(temporaryName, public_id);
    } else {
      result = await uploadImage(temporaryName);
    }

    await User.findByIdAndUpdate(id, {
      name,
      avatarURL: result.url,
      avatar: result,
    });
    fs.unlink(temporaryName);
    res.status(200);
    res.json(`avatar changed to ${result.url}, name changed to ${name}`);
  } catch (error) {
    fs.unlink(temporaryName);
    next(error);
  }
};

module.exports = {
  userRegistration: ctrlWrapper(userRegistration),
  userLogin: ctrlWrapper(userLogin),
  userLogout: ctrlWrapper(userLogout),
  userCurrent: ctrlWrapper(userCurrent),
  userUpdateAvatar: ctrlWrapper(userUpdateAvatar),
};
