const User = require("../models/userModel");
const { ctrlWrapper } = require("../helpers/index");
const Ingredients = require("../models/ingredientsModel");

const getIngredientsFromShoppingList = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.find({ _id }).populate({
    path: "addShoppingListBy",
    populate: {
      path: "_id",
      model: User,
      populate: [{ path: "addShoppingListBy.id", model: Ingredients }],
    },
  });
    
    if (user) {
    const result = user;
    res.status(200).json({
      data: result,
    });
  } else if (!user.addShoppingListBy.length) {
    res.status(200).json({
      message: `Shopping list is empty`,
    });
  }
};

const addIngredientsInShoppingList = async (req, res, next) => {
  const { _id } = req.user;
  // console.log(req);
  const  ingredient = req.body.ingredient;
  const  measure = req.body.measure;

  const newIngredient = {
    id: ingredient,
    measure: measure
  };

  const user = await User.findByIdAndUpdate(_id, {
    $push: { addShoppingListBy: { ...newIngredient } },
  });

  res.status(200).json({
    message: `Ingredient added`,

    ingredient: newIngredient,
  });
};


const removeIngredientsFromShoppingList = async (req, res, next) => {
  const { _id } = req.user;
  const { id: idToDelete } = req.params;
  await User.findOneAndUpdate(
    { _id: _id },
    {
      $pull: { addShoppingListBy: { _id: idToDelete } },
    }
  );
  res.status(200).json({
    message: 'Ingredient deleted from shopping list',
  });
};

module.exports = {
  getIngredientsFromShoppingList: ctrlWrapper(getIngredientsFromShoppingList),
  addIngredientsInShoppingList: ctrlWrapper(addIngredientsInShoppingList),
  removeIngredientsFromShoppingList: ctrlWrapper(removeIngredientsFromShoppingList),
};

