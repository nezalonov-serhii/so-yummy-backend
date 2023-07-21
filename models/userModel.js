
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set user name"],
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  avatarURL: {
    type: String,
    default: "",
  },
  avatar: {},
  isValidated: {
    type: Boolean,
    default: false,
  },
  favorites: {
    type: Array,
    default: [],
  },
  subscribe: {
    type: Boolean,
    default: false,
  },
  ownRecipes: [{ type: Schema.Types.ObjectId, ref: "recipes" }],

  shoppingList: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: "ingredients",
      },

      ingredientId: {
        type: String,
        default: ''
      },

      measure: {
        type: String,
        required: [true, "Set the measure"],
      },
    },
  ],
  token: {
    type: String,
    default: "",
  },
});

module.exports = model("user", userSchema);

/**
 * @openapi
 * components:
 *  schemas:
 *   userRegister:
 *     type: object
 *     required:
 *             - name
 *             - email
 *             - password
 *     properties:
 *         name:
 *           type: string
 *           description: Name of new user
 *         email:
 *           type: string
 *           description: Email of new user, must be unique through database
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *   userLogin:
 *     type: object
 *     required:
 *             - email
 *             - password
 *     properties:
 *         email:
 *           type: string
 *           description: Email of new user, must be unique through database
 *         password:
 *           type: string
 *           description: User password
 *
 *   userLoginResponse:
 *     type: object
 *     properties:
 *         token:
 *           type: string
 *           description: User token
 *
 *
 *   userRegisterResponse:
 *     type: object
 *     properties:
 *         id:
 *           type: string
 *           description: The auto-genereted by database unique id
 *         name:
 *           type: string
 *           description: Name of new user
 *         email:
 *           type: string
 *           description: Email of new user, must be unique through database
 *         password:
 *           type: string
 *           description: User password
 *         avatarURL:
 *           type: string
 *           default: ""
 *           description: Url to user avatar
 *         avatar:
 *           type: object
 *           description: Object with user avatar data
 *         isValidated:
 *           type: boolean
 *           default: false
 *           description: Defines wether the user confirmed email
 *         favorites:
 *          type: array
 *          items: {}
 *          description: Array of favorite recipes
 *         ownRecipes:
 *           type: array
 *           items: {}
 *           description: Array of users own recipes
 *         token:
 *           type: string
 *           description: JSON token
 *
 *   userUpdateAvatarAndName:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *          avatar:
 *              type: string
 *              format: binary
 *   Error:
 *      type: object
 *      properties:
 *         message:
 *           type: string
 */
