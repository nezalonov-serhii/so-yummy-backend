const authenticate = require("./authenticate");
const avatarsMiddleware = require("./avatarsMiddleware");
const validateBody = require("./validateBody");

module.exports = {
  authenticate,
  avatarsMiddleware,
  validateBody,
};