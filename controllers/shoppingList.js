const User = require("../models/userModel");
const userSchema = require("../models/userModel")

const getIngredientsFromShoppingList = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.find({ _id }).populate({
    path: "addIngredientsInShoppingList",
    populate: {
      path: "_id",
      model: userSchema,
      populate: [{ path: "ingredients.id", model: Ingredients }],
    },
  });
    
    if (user) {
    const result = user;
    res.status(200).json({
      data: result,
    });
  } else if (!user.addIngredientsInShoppingList.length) {
    res.status(200).json({
      message: `Shopping list is empty`,
    });
  }
};


const addIngredientsInShoppingList = async (req, res, next) => {
  const { _id } = req.user;

  
};


const removeIngredientsFromShoppingList = async (req, res, next) => {
  const { _id } = req.user;
  const { id: idToDelete } = req.params;

  const deleted = await ingredientsSchema.findByIdAndDelete(idToDelete);
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

// скаpать тим лиду добавить в ингридиенты новое поле для юзеров которые добавили в свой шопинг лист ингридиент