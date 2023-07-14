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

const addIngridientToShopping = async (req,res,next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const ingridient = req.body;

  const user = await User.findById({ _id });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.shopping.includes(id)) {
    throw HttpError(409, "Recipe is already added to user");
    // зробити так щоб кількість добавлялась а не робилась помилка
  }
  const addShoppingIngridientsToUser = await User.findByIdAndUpdate(
    { _id },
    { $push: { shopping: id } },
    { new: true }
  );
  res.status(201).json({
    message: `Ingridient ${addShoppingIngridientsToUser.name} is added to favorite`,
    recipe: addShoppingIngridientsToUser,
  });

}




module.exports = {
    getShopping: ctrlWrapper(getShopping),
    addIngridientToShopping: ctrlWrapper(addIngridientToShopping),
};