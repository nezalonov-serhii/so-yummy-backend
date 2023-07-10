const Ingredient = require("../models/ingredientModel");
const Recipe = require("../models/recipeModel");
const { ctrlWrapper } = require("../helpers");
// const { default: mongoose } = require("mongoose");
const { Types } = require("mongoose");


const ingredientList = async (req, res, next) => {
      const result = await Ingredient.find();
      res.status(200).json({
        code: 200,
        message: "Success",
        data: result,
        qty: result.length,
      });
}

const findRecipesByIngredient = async (req, res, next) => {
    const ingredientID = '640c2dd963a319ea671e365c';
    // const ObjectId = new mongoose.Types.ObjectId;
    const ObjectId = Types.ObjectId;

    // ObjectId.createFromHexString(id);

    const result = await Recipe.find({
      ingredients: {
        $elemMatch: {
          id: ObjectId.createFromHexString("640c2dd963a319ea671e365c"),
        },
      },
    });
          res.status(200).json({
            code: 200,
            message: "Success",
            data: result,
            qty: result.length,
          });
}

module.exports = {
  ingredientList: ctrlWrapper(ingredientList),
  findRecipesByIngredient: ctrlWrapper(findRecipesByIngredient),
};