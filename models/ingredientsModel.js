const { Schema, model } = require("mongoose");

const ingredientsSchema = new Schema({
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

module.exports = model("ingredients", ingredientsSchema);
