const Ingredient = require("../models/ingredientsModel");
const Recipe = require("../models/recipeModel");
const { ctrlWrapper } = require("../helpers");
const HttpError = require("../helpers/HttpError");

const ingredientList = async (req, res, next) => {
  const result = await Ingredient.find();
  res.status(200).json({
    code: 200,
    message: "Success",
    data: result,
    qty: result.length,
  });
};

const findRecipesByIngredient = async (req, res, next) => {
  const { query } = req.body;
  const { page, limit } = req.query;
  let pageNumber = page ? page : 1;
  let nPerPage = limit ? limit: 8;
  
  
  let skip = pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0;

  const searchedIngredients = await Ingredient.find({
    name: { $regex: query, $options: "i" },
  });
  if (searchedIngredients.length === 0) {
    return res.status(200).json({
      data: [],
      message: "Such ingredient not found",
    });
  }

  const ids = searchedIngredients.map((ingredient) => ingredient.id);

  const result = await Recipe.find({
    ingredients: {
      $elemMatch: {
        id: {
          $in: [...ids],
        },
      },
    },
  })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(nPerPage);

  if (result.length === 0) {
    res.status(200).json({
    code: 200,
    message: "Recipes not found",
    data: []
    })
  }

  res.status(200).json({
    code: 200,
    message: "Success",
    data: result,
    qty: result.length,
  });
};

module.exports = {
  ingredientList: ctrlWrapper(ingredientList),
  findRecipesByIngredient: ctrlWrapper(findRecipesByIngredient),
};
