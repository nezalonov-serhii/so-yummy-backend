const Recipe = require("../models/recipeModel");
const Ingredients = require("../models/ingredientsModel");
const categoriesModel = require("../models/categoriesModel");
const { ctrlWrapper } = require("../helpers/index");

const getAllRecipes = async (req, res, next) => {
const { page, limit } = req.query;

  let pageNumber = page ? page : 1;
  let nPerPage = limit ? parseInt(limit) : 8;
  let skip = pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0;
  const result = await Recipe.aggregate([
    { $match: {} },
    { $sort: { _id: 1 } },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: nPerPage }],
      },
    },
  ]);

  await Ingredients.populate(result, {
    path: "data.ingredients.id",
    model: Ingredients,
  });

  res.status(200).json({
    code: 200,
    message: "Success",
    data: result[0].data,
    qty: result[0].metadata[0],
  });
};

const getCategoriesList = async (req, res, next) => {
  const result = await categoriesModel.distinct("name");
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
  const { page, limit } = req.query;

  let pageNumber = page ? page : 1;
  let nPerPage = limit ? limit : 8;
  let skip = pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0;

  const result = await Recipe.aggregate([
    { $match: { category } },
    { $sort: { _id: 1 } },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: nPerPage }],
      },
    },
  ]);

  await Ingredients.populate(result, {
    path: "data.ingredients.id",
    model: Ingredients,
  });

  // const result = await Recipe.find({ category }).populate({
  //   path: "ingredients",
  //   populate: { path: "id", model: Ingredients },
  // });
  //
  if (!result[0].data.length) {
    res.status(404).json({
      code: 404,
      message: "No such category",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "Success",
    data: result[0].data,
    qty: result[0].metadata[0],
  });
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

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
