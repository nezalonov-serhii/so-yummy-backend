const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Set recipe title"],
  },
  category: {
    type: String,
  },
  area: {
    type: String,
    required: [true, "Set the area"],
  },

  instructions: {
    type: String,
    required: [true, "Set the instructions"],
  },
  description: {
    type: String,
  },
  thumb: {
    type: String,
  },
  preview: {
    type: String,
  },
  time: {
    type: String,
    required: [true, "Set the time"],
  },
  youtube: {
    type: String,
  },
  tags: [],
  isLikedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  ingredients: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "ingredients",
      },
      measure: {
        type: String,
        required: [true, "Set the measure"],
      },
    },
  ],
});

module.exports = model("recipe", recipeSchema);
