const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const { ctrlWrapper } = require("../helpers/index");

const getOwnRecipes = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findById(_id);
  if (user.ownRecipes.length) {
    const result = user.ownRecipes;
    res.status(200).json({
      data: result,
    });
  } else if (!user.ownRecipes.length) {
    res.status(200).json({
      message: `User ${user.name} does not have own recipes`,
    });
  }
  console.log("user", user);
};
const postOwnRecipe = async (req, res, next) => {
  const { _id } = req.user;
  const recipe = req.body;
  const newRecipe = await Recipe.create({ ...recipe, owner: _id });
  const user = await User.findByIdAndUpdate(
    _id,
    {
      $push: { ownRecipes: {...newRecipe} },
    }
  );
  res.status(200).json({
    message: `Recipe ${newRecipe.title} added`,
      data: user,
    recipe: newRecipe
  });
};
const deleteOwnRecipe = async (req, res, next) => {};
module.exports = {
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  postOwnRecipe: ctrlWrapper(postOwnRecipe),
  deleteOwnRecipe: ctrlWrapper(deleteOwnRecipe),
};
