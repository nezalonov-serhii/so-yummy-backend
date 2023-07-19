const { ctrlWrapper } = require("../helpers/index");
const { HttpError } = require("../helpers/index");
const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const Ingrediend = require('../models/ingredientsModel')

const addRecepiesToFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const recipe = req.body;

  const user = await User.findById({ _id });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.favorites.includes(id)) {
    throw HttpError(409, "Recipe is already added to user");
  }

  const addFavoriteToUser = await User.findByIdAndUpdate(
    { _id },
    { $push: { favorites: id } },
    { new: true }
  );

  const favoriteRecipe = await Recipe.findOneAndUpdate(
    { _id: id },
    { $push: { favorites: _id } },
    { new: true }
  );

  res.status(201).json({
    message: `Recipe ${favoriteRecipe.title} is added to favorite`,
    recipe: favoriteRecipe,
  });
};

const getFavoriteRecipes = async (req, res, next) => {
  const { _id } = req.user;
  const pageNumber = 1;
  const nPerPage = 6;
  let skip = pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0;
//   const user = await User.findOne({ _id });

//   if (!user) {
//     throw HttpError(404, "User not found");
//   }

//   const favoriteRecipes = await Recipe.find({
//     _id: { $in: user.favorites },
//   });

//   if (!favoriteRecipes) {
//     throw HttpError(404, "Recipes not found");
//    }
   
   const result = await User.aggregate([
    { $match: { _id: _id } },
    { $unwind: "$favorites" },
    { $project: { favorites: 1 } },
    { $sort: { favorites: 1 } },
      {$facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: nPerPage }],
      },
    },
  ]);

  await Recipe.populate(result, {
    path: "data.favorites", model: Recipe

  });
 await Ingrediend.populate(result, {path: "data.favorites.ingredients.id", model: Ingrediend})

  res.status(200).json({
    message: `recipes`,
    data: result[0].data, 
    qty: Object.assign({}, result[0].metadata)
  });

//   res.status(200).json({
//     favoriteRecipes,
//     data: user.favorites.length ? user.favorites : [],
//   });
};

const removeFavoriteRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const recipe = req.body;

  const user = await User.findById({ _id });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const removeFavoriteFromUser = await User.findByIdAndUpdate(
    { _id },
    { $pull: { favorites: id } },
    { new: true }
  );

  const removeFavoriteFromRecipe = await Recipe.findOneAndUpdate(
    { _id: id },
    { $pull: { favorites: _id } },
    { new: true }
  );

  res.status(200).json({
    message: "Recipe was deleted success",
    recipe: removeFavoriteFromRecipe,
  });
};

module.exports = {
  addRecepiesToFavorite: ctrlWrapper(addRecepiesToFavorite),
  getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
  removeFavoriteRecipe: ctrlWrapper(removeFavoriteRecipe),
};
