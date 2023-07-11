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

  // verificationCode: {
  //   type: String
  // },
  isValidated: {
    type: Boolean,
    default: false,
  },
  favorites: {
      type: Array,
      default: [],
    },
  ownRecipes: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "recipes"
      },
    },
  ],
  token: {
    type: String,
    default: "",
  },
});

module.exports = model("user", userSchema);
