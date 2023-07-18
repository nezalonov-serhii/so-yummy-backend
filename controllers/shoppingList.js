const User = require("../models/userModel");
const { ctrlWrapper } = require("../helpers/index");
const Ingredients = require("../models/ingredientsModel");
const { HttpError } = require("../helpers");

const getIngredientsFromShoppingList = async (req, res, next) => {
  const { _id } = req.user;
  const data = await User.findById(_id).populate({
    path: "shoppingList",
    populate: { path: "ingredient", model: Ingredients },
  });

  if (data.shoppingList.length) {
    res.status(200).json({
      data: data.shoppingList,
    });
  } else {
    res.status(200).json({
      message: `Shopping list is empty`,
      data: [],
    });
  }
};

const addIngredientsInShoppingList = async (req, res, next) => {
  const { _id } = req.user;
  const { ingredient, measure: newMeasure } = req.body;

  const addIngredient = await Ingredients.findById({ _id: ingredient });
  if (!addIngredient) {
    throw HttpError(404, "Ingrediend by ID not found");
  }
  const newIngredient = {
    ingredient,
    measure: newMeasure,
    ingredientId: ingredient,
  };

  const user = await User.findById(_id);
  if (!user.shoppingList || user.shoppingList.length === 0) {
    user.shoppingList = [newIngredient];
    user.save();
  } else if (user.shoppingList.length) {
    const index = user.shoppingList.findIndex((obj) => {
      return obj.ingredient == ingredient;
    });
    if (index !== -1) {
      user.shoppingList[index].measure = user.shoppingList[
        index
      ].measure.concat("/r/n", newMeasure);
    } else {
      user.shoppingList = [...user.shoppingList, newIngredient];
    }
    user.save();
  }

  res.status(200).json({
    message: `New ingredient added`,
    data: user.shoppingList,
  });
};

const removeIngredientsFromShoppingList = async (req, res, next) => {
  const { _id } = req.user;
  const { id: idToDelete } = req.params;

  await User.findOneAndUpdate(
    { _id: _id },
    {
      $pull: { shoppingList: {ingredient: idToDelete } },
    }
  );
  res.status(200).json({
    message: "Ingredient deleted from shopping list",
  });
};

module.exports = {
  getIngredientsFromShoppingList: ctrlWrapper(getIngredientsFromShoppingList),
  addIngredientsInShoppingList: ctrlWrapper(addIngredientsInShoppingList),
  removeIngredientsFromShoppingList: ctrlWrapper(
    removeIngredientsFromShoppingList
  ),
};
