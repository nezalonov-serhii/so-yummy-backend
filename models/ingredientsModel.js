const { Schema, model } = require("mongoose");

const ingredientsSchema = new Schema({
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
});

module.exports = model("ingredients", ingredientsSchema);
