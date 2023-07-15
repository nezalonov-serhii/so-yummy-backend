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

  const shoppingList = user.shopping;

  if (!shoppingList) {
    throw HttpError(404, "Recipes not found");
  }

  res.status(200).json(shoppingList);
};

const addIngridientToShopping = async (req,res,next) => {
  const { _id } = req.user;
  const ingridient = req.body;
  const user = await User.findById({ _id });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  // зробити так щоб якщо у двох інгрідієнтів однакве айді
  //  то щоб мінялась тільки кількість замовлення quantity ++

  const addShoppingIngridientsToUser = await User.findByIdAndUpdate(
    { _id },
    { $push: { shopping: ingridient } },
    { new: true }
  );
  res.status(201).json({
    message: `Ingridient ${ingridient.name} is added to shopping-list`,
    ingridient: ingridient,
  });

}

const removeIngridientFromShoppingList = async (req,res,next) =>{
  // поки не готове
  // поки не готове
  const { _id } = req.user;
  const { id } = req.params;
  const user = await User.findById({ _id });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  const newList = await User.findByIdAndUpdate({_id},
    {$pull:{shopping:id}},
  {new:true})
  res.status(201).json({
    message: `Ingridient removed from shopping-list`,
    shopping: newList.shopping,
  });

}





module.exports = {
    getShopping: ctrlWrapper(getShopping),
    addIngridientToShopping: ctrlWrapper(addIngridientToShopping),
    removeIngridientFromShoppingList: ctrlWrapper(removeIngridientFromShoppingList),
};