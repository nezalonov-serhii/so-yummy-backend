const { ctrlWrapper } = require("../helpers/index");
const Recipe = require("../models/recipeModel");

const popularRecipes = async (req, res) => {

  const allRecipes = await Recipe.find();
  const result = allRecipes
    .filter((recipe) => recipe.favorites && recipe.favorites.length > 0)
    .sort((a, b) => b.favorites.length - a.favorites.length)
    .slice(0, 4);

  res.status(200).json({
    code: 200,
    message: "Success",
    data: result,
  });
};
module.exports = {
  popularRecipes: ctrlWrapper(popularRecipes),
};
