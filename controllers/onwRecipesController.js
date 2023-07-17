const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const Ingredients = require("../models/ingredientsModel");
const { ctrlWrapper } = require("../helpers/index");
const { uploadRecipeImage, deleteRecipeImg } = require("../helpers/cloudinary");
const fs = require("fs/promises");
const { default: mongoose } = require("mongoose");

const getOwnRecipes = async (req, res, next) => {
  const { _id } = req.user;

  const data = await User.findById(_id).populate("ownRecipes", null, Recipe);


  if (data.ownRecipes.length) {

    res.status(200).json({
      data: data.ownRecipes,
    });
  } else {
    res.status(404).json({
      message: `User does not have own recipes`,
    });
  }
};

const postOwnRecipe = async (req, res, next) => {
  const { _id } = req.user;

  const ingredients =
    typeof req.body.ingredients === "string"
      ? JSON.parse(req.body.ingredients)
      : req.body.ingredients;
  const recipe = req.body;
  let uploadRecipeImg = {};
  let temporaryName = "";
  console.log("recipe.instructions", req.body);
  const instructs = recipe.instructions.join("\r\n");

  if (req.file) {
    temporaryName = req.file.path;
    uploadRecipeImg = await uploadRecipeImage(temporaryName);
  }

  const newRecipe = await Recipe.create({
    ...recipe,
    instructions: instructs,
    ingredients,

    thumb: uploadRecipeImg.hasOwnProperty("url") ? uploadRecipeImg.url : "",
    imgPublicId: uploadRecipeImg.hasOwnProperty("public_id")
      ? uploadRecipeImg.public_id
      : "",

    preview: uploadRecipeImg.url,

    owner: _id,
  });

  await User.findByIdAndUpdate(_id, {
    $push: { ownRecipes: { ...newRecipe } },
  });

  if (req.file) {
    
    fs.unlink(temporaryName);
  }

  res.status(200).json({
    message: `Recipe ${newRecipe.title} added`,
    recipe: newRecipe,
  });
};

const deleteOwnRecipe = async (req, res, next) => {
  const { _id } = req.user;
  const { id: idToDelete } = req.params;

  const deleted = await Recipe.findByIdAndDelete(idToDelete);
  console.log("deleted.imgPublicId", deleted.imgPublicId);
  if (deleted.imgPublicId) {
    console.log("IF deleted.imgPublicId", deleted.imgPublicId);
    await deleteRecipeImg(deleted.imgPublicId);
  }

  await User.findOneAndUpdate(
    { _id: _id },
    {
      $pull: { ownRecipes: idToDelete },
    },
    { new: true }
  );
  res.status(200).json({
    message: `Recipe deleted`,
  });
};

module.exports = {
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  postOwnRecipe: ctrlWrapper(postOwnRecipe),
  deleteOwnRecipe: ctrlWrapper(deleteOwnRecipe),
};
