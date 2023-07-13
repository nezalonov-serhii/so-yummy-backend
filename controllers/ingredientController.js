const Ingredient = require("../models/ingredientsModel");
const Recipe = require("../models/recipeModel");
const { ctrlWrapper } = require("../helpers");

const ingredientList = async (req, res, next) => {

      const result = await Ingredient.find();
      res.status(200).json({
        code: 200,
        message: "Success",
        data: result,
        qty: result.length,
      });
}

const findRecipesByIngredient = async (req, res, next) => {
    const {query} = req.body;
    
    const searchedIngredients = await Ingredient.find({
      name: { $regex: query, $options: "i" },
    });
      if (searchedIngredients.length === 0) {
        throw HttpError(404, "ingredient not found");
      }

    const ids = searchedIngredients.map((ingredient) => ingredient.id);

    const result = await Recipe.find({
        ingredients: {
            $elemMatch: {
                id: {
                    $in: [...ids],
                }
            },
      },
    });
          if (result.length === 0) {
            throw HttpError(404, `Recipe with ingredient ${query} is not found`);
          }

          res.status(200).json({
            code: 200,
            message: "Success",
            data: result,
            qty: result.length,
          });
}

module.exports = {
  ingredientList: ctrlWrapper(ingredientList),
  findRecipesByIngredient: ctrlWrapper(findRecipesByIngredient),
};