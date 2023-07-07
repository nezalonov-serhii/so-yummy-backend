const Recipe = require("../models/recipeModel");
const { ctrlWrapper } = require("../helpers/index");

const getAllRecipes = async (req, res, next) => {
  const result = await Recipe.find({}).populate('ingredients').exec();
 
  res.status(200).json({
    code: 200,
    message: "Success",
    data: result,
    qty: result.length,
  });
};

module.exports = {
  getAllRecipes: ctrlWrapper(getAllRecipes),
};
