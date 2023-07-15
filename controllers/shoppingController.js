const { ctrlWrapper } = require("../helpers/index");
const { HttpError } = require("../helpers/index");
const Ingredient = require("../models/ingredientsModel")
const User = require("../models/userModel");

const getShopping = async (req, res, next) => {
    const { _id } = req.user;

  const user = await User.findOne({ _id });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const shoppingList= await Ingredient.find({
    _id: { $in: user.shopping },
  });

  if (!shoppingList) {
    throw HttpError(404, "Recipes not found");
  }

  res.status(200).json(shoppingList);
  };

module.exports = {
    getShopping: ctrlWrapper(getShopping),
};