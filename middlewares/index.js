const authenticate = require("./authenticate");
const avatarsMiddleware = require("./avatarsMiddleware");
const validateBody = require("./validateBody");
const validateRequest = require('./validateRequest');

module.exports = {
  authenticate,
  avatarsMiddleware,
  validateBody,
  validateRequest,
};