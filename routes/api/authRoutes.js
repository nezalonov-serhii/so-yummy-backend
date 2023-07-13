const express = require("express");
const router = express.Router();

const {validateBody} = require('../../middlewares/validateBody')
const schemas = require('../../schemas/validation')
const AuthController = require('../../controllers/authController')
const authenticate = require('../../middlewares/authenticate')
const { upload } = require("../../middlewares/avatarsMiddleware")


/**
 * @openapi
 * tags:
 *  name: Users
 *  description: User authentication functions
 */

/**
 * @openapi
 * /users/register:
 *  post:
 *   summary: Returns object with new user data
 *   tags: [Users]
 *   security: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/userRegister"
 *   responses:
 *     201:
 *       description: User is registered, added gravatar
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/userRegisterResponse"
 */



router.post("/register", validateBody(schemas.userRegisterValidation), AuthController.userRegistration);

/**
 * @openapi
 * /users/login:
 *  post:
 *   summary: Returns object with new user data
 *   tags: [Users]
 *   security: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/userLogin"
 *   responses:
 *     200:
 *       description: User is logged in, genereted new JWN token
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/userLoginResponse"
 */

router.post("/login", validateBody(schemas.userLoginValidation), AuthController.userLogin);

/**
 * @openapi
 * /users/logout:
 *  post:
 *   summary: Logging user out, destroy JWT
 *   tags: [Users]
 *   parameters:
 *      - name: authorization
 *        in: header
 *        security: 
 *          - bearerAuth: []
 *        description: User token
 *   responses:
 *     200:
 *       description: User is logged out, JWT token destroyed
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  message:
 *                      type: string
 */

router.post("/logout", authenticate, AuthController.userLogout);

/**
 * @openapi
 * /users:
 *  get:
 *   summary: Get information of current user
 *   tags: [Users]
 *   responses:
 *     200:
 *       description: Logged in user data
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/userRegisterResponse"
 */

router.get('/', authenticate, AuthController.userCurrent);

/**
 * @openapi
 * /users/avatars:
 *  patch:
 *   summary: Update user name and / or user avatar
 *   tags: [Users]
 *   requestBody:
 *     required: true
 *     content:
 *       multipart/form-data:
 *         schema:
 *                  $ref: "#/components/schemas/userUpdateAvatarAndName"
 *   responses:
 *     200:
 *       description: User data updated
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  name:
 *                      type: string
 *                  avatarURL:
 *                      type: string
 *                  avatar:
 *                      type: object
 */

router.patch('/avatars', upload.single("avatar"), authenticate, AuthController.userUpdateAvatar)

module.exports = router;