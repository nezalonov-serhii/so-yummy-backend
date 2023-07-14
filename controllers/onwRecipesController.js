const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const Ingredients = require("../models/ingredientsModel");
const { ctrlWrapper } = require("../helpers/index");
const { uploadRecipeImage, deleteRecipeImg } = require("../helpers/cloudinary");
const fs = require("fs/promises");

const getOwnRecipes = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.find({ _id }, "ownRecipes").populate({
    path: "ownRecipes",
    populate: {
      path: "_id",
      model: Recipe,
      populate: [{ path: "ingredients.id", model: Ingredients }],
    },
  });

  if (user) {
    const result = user;
    res.status(200).json({
      data: result,
    });
  } else if (!user.ownRecipes.length) {
    res.status(200).json({
      message: `User ${user.name} does not have own recipes`,
    });
  }
};
const postOwnRecipe = async (req, res, next) => {
  const { _id } = req.user;
  const recipe = req.body;
  let uploadRecipeImg = {};
  // console.log("req file before", req.file);
  // console.log("recipe", recipe);
  let temporaryName = "";
  if (req.file) {
    console.log("req file in if", req.file);
    temporaryName = req.file.path;
    uploadRecipeImg = await uploadRecipeImage(temporaryName);
  }

  const newRecipe = await Recipe.create({
    ...recipe,
    thumb: uploadRecipeImg.url,
    imgPublicId: uploadRecipeImg.public_id,
    preview: uploadRecipeImg.public_id,
    owner: _id,
  });
  // console.log('new recipe', newRecipe)
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
  await deleteRecipeImg(deleted.imgPublicId);
  await User.findOneAndUpdate(
    { _id: _id },
    {
      $pull: { ownRecipes: { _id: idToDelete } },
    }
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
