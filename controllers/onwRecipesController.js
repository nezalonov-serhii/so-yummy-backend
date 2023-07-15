const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const Ingredients = require("../models/ingredientsModel");
const { ctrlWrapper } = require("../helpers/index");
const { uploadRecipeImage, deleteRecipeImg } = require("../helpers/cloudinary");

const getOwnRecipes = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.find({ _id }).populate({
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
  const { path: temporaryName, filename: newFileName } = req.file;
  const recipe = req.body;
  const uploadRecipeImg = await uploadRecipeImage(temporaryName);

  const newRecipe = await Recipe.create({
    ...recipe,
    thumb: uploadRecipeImg.url,
    imgPiblicId: uploadRecipeImg.public_id,
    owner: _id,
  });

  const user = await User.findByIdAndUpdate(_id, {
    $push: { ownRecipes: { ...newRecipe } },
  });
  res.status(200).json({
    message: `Recipe ${newRecipe.title} added`,

    recipe: newRecipe,
  });
};

const deleteOwnRecipe = async (req, res, next) => {
  const { _id } = req.user;
  const { id: idToDelete } = req.params;

  const deleted = await Recipe.findByIdAndDelete(idToDelete);
  await deleteRecipeImg(deleted.imgPiblicId)
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
