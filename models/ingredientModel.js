const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set ingredient name"],
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
});

module.exports = model("ingredient", ingredientSchema);