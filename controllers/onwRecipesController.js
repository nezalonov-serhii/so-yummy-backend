const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const Ingredients = require("../models/ingredientsModel");
const { ctrlWrapper } = require("../helpers/index");
const { uploadRecipeImage, deleteRecipeImg } = require("../helpers/cloudinary");
const fs = require("fs/promises");
const { default: mongoose } = require("mongoose");

const getOwnRecipes = async (req, res, next) => {
  const { _id } = req.user;
  const { page, limit } = req.query;
   let pageNumber = page ? page : 1;
let nPerPage = limit ? parseInt(limit) : 8;
  let skip = pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0;
  const result = await User.aggregate([
    { $match: { _id: _id } },
    { $unwind: "$ownRecipes" },
    { $project: { _id: 0, ownRecipes: 1 } },
    { $sort: { ownRecipes: 1 } },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: nPerPage }],
      },
    },
    
  ]);

  await Recipe.populate(result, {
    path: "data.ownRecipes",
    model: Recipe,
  });

  res.status(200).json({
    message: `recipes`,
    data: result[0].data,
    qty: result[0].metadata[0],
  });


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

  res.status(201).json({
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
      $pull: { favorites: idToDelete, ownRecipes: idToDelete },
    },
    { new: true }
  );
  res.status(204).json({
    message: `Recipe deleted`,
  });
};

module.exports = {
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  postOwnRecipe: ctrlWrapper(postOwnRecipe),
  deleteOwnRecipe: ctrlWrapper(deleteOwnRecipe),
};
