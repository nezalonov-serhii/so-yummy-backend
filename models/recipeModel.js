const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Set recipe title"],
  },
  category: {
    type: String,
    required: [true, "Set recipe category"],
  },
  area: {
    type: String,
    default: "",
  },

  instructions: {
    type: Array,
    required: [true, "Set the instructions"],
  },
  description: {
    type: String,
    required: [true, "Set the description"],
  },
  thumb: {
    type: String,
    default: "",
  },
  imgPiblicId: {
    type: String,
  },
  preview: {
    type: String,
    default: "",
  },
  time: {
    type: String,
    required: [true, "Set the time"],
  },
  youtube: {
    type: String,
    default: "",
  },
  tags: {
    type: Array,
    default: [],
  },
  isLikedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  ingredients: [
    {
      id: {
        type: String,
        ref: "ingredients",
      },
      measure: {
        type: String,
        required: [true, "Set the measure"],
      },
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = model("recipes", recipeSchema);
