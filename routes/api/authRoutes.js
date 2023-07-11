const express = require("express");
const router = express.Router();

const {validateBody} = require('../../middlewares/validateBody')
const schemas = require('../../schemas/validation')
const AuthController = require('../../controllers/authController')
const authenticate = require('../../middlewares/authenticate')
const {upload} = require("../../middlewares/avatarsMiddleware")

router.post("/register", validateBody(schemas.userRegisterValidation), AuthController.userRegistration);
router.post("/login", validateBody(schemas.userLoginValidation), AuthController.userLogin);
router.post("/logout", authenticate, AuthController.userLogout);
router.get('/', authenticate, AuthController.userCurrent);
router.patch('/avatars', upload.single("avatar"), authenticate, AuthController.userUpdateAvatar)

module.exports = router;