const { ctrlWrapper } = require("../helpers/index");
const { HttpError} = require('../helpers/index')
const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");

const addRecepiesToFavorite = async (req, res, next) => {
const { id } = req.params;
    const { _id } = req.user;
     const recipe = req.body;

    const user = await User.findById({ _id });

    if (!user) {
        throw HttpError(404, 'User not found');
    }

    if (user.favorites.includes(id)) {
        throw HttpError(409, 'Recipe is already added to user');
    }

    const addFavoriteToUser = await User.findByIdAndUpdate(
        { _id },
        { $push: { favorites: id } },
        { new: true }
    );

    const favoriteRecipe = await Recipe.findOneAndUpdate(
        { _id: id },
        { $push: { favorites: _id } },
        { new: true }
    );

    res.json({
        message: `Recipe ${favoriteRecipe.title} is added to favorite`, 
        recipe: favoriteRecipe,
    });
}
 
module.exports = {
addRecepiesToFavorite: ctrlWrapper(addRecepiesToFavorite)
};