const Recipe = require("../models/recipeModel");
const Ingredients = require("../models/ingredientsModel");
const { ctrlWrapper } = require("../helpers/index");

const getAllRecipes = async (req, res, next) => {
  const result = await Recipe.find({}).populate("ingredients").exec();

  res.status(200).json({
    code: 200,
    message: "Success",
    data: result,
    qty: result.length,
  });
};

const getCategoriesList = async (req, res, next) => {
  const result = await Recipe.distinct("category");
  if (!result.length) {
    res.status(404).json({
      code: 404,
      message: "No such category",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "Success",
    data: result,
    qty: result.length,
  });
};

const mainPageRecipes = async (req, res, next) => {
  const result = await Recipe.aggregate([
    {
      $match: {
        $or: [
          { category: "Breakfast" },
          { category: "Miscellaneous" },
          { category: "Chicken" },
          { category: "Dessert" },
        ],
      },
    },
    {
      $group: {
        _id: "$category",
        mainPage: {
            $push: {
              id: "$_id",
            title: "$title",
            thumb: "$thumb",
            preview: "$preview",
            category: "$category",
          },
        },
      },
      
    },
  ]);
  res.status(200).json({
    code: 200,
    message: "Success",
    data: result,
  });
};

const getRecipeByCategory = async (req, res, next) => {
  const { category } = req.params;

  const result = await Recipe.find({ category })
    .limit(8)
    .populate({
    path: "ingredients",
    populate: { path: "id", model: Ingredients },
  });
  if (!result.length) {
    res.status(404).json({
      code: 404,
      message: "No such category",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "Success",
    data: result,
  });
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  console.log("category: id", id);
  const result = await Recipe.findById(id).populate({
    path: "ingredients",
    populate: { path: "id", model: Ingredients },
  });
  if (!result) {
    res.status(404).json({
      code: 404,
      message: "No such recipe found",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "Success",
    data: result,
  });
};
module.exports = {
  getAllRecipes: ctrlWrapper(getAllRecipes),
  getCategoriesList: ctrlWrapper(getCategoriesList),
  mainPageRecipes: ctrlWrapper(mainPageRecipes),
  getRecipeByCategory: ctrlWrapper(getRecipeByCategory),
  getRecipeById: ctrlWrapper(getRecipeById),
};
