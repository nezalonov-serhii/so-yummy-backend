const express = require("express");
const router = express.Router();
const authenticate = require('../../middlewares/authenticate')
const ownRecipesController = require('../../controllers/onwRecipesController')

router.use(authenticate)
router.get('/', ownRecipesController.getOwnRecipes)
router.post('/', ownRecipesController.postOwnRecipe)

module.exports = router