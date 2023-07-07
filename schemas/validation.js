const Joi = require("joi");
const { emailRegexp } = require("../constants/constants");


const userRegisterValidation = Joi.object({
  name: Joi.string().trim().required('Field "Name" should not be empty'),
  password: Joi.string().required("Enter password"),
  email: Joi.string().pattern(emailRegexp).required("Enter valid email"),
});

const userLoginValidation = Joi.object({
  password: Joi.string().required("Enter password"),
  email: Joi.string().pattern(emailRegexp).required("Enter valid email"),
});

const emailValidation = Joi.object({
  email: Joi.string().pattern(emailRegexp).required("Enter valid email"),
});
module.exports = {
  userRegisterValidation,
  userLoginValidation,
  emailValidation,
};
