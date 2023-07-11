const { Schema, model } = require("mongoose");

const ingredientsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set user name"],
  },
  desc: {
    type: String,
    required: [true, "Put ingredient description"],
  },
  img: {
    type: String,
  },
});

module.exports = model("ingredients", ingredientsSchema);
