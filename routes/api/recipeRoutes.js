const express = require("express");
const authenticate = require('../../middlewares/authenticate')
const recipeController = require('../../controllers/recipeController')
const router = express.Router();
const {checkReqParams} = require('../../helpers')

router.use(authenticate)
router.get('/', recipeController.getAllRecipes)
router.get('/category-list', recipeController.getCategoriesList)
router.get('/main-page', recipeController.mainPageRecipes)
router.get('/:category', checkReqParams, recipeController.getRecipeByCategory)
router.get('/:id', recipeController.getRecipeById)

module.exports = router;