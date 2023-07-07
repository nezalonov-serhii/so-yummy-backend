const express = require("express");
const authenticate = require('../../middlewares/authenticate')
const recipeController = require('../../controllers/recipeController')
const router = express.Router();

router.use(authenticate)
router.get('/', recipeController.getAllRecipes)

module.exports = router;