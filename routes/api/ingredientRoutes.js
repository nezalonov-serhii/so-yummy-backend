const express = require("express");
const authenticate = require("../../middlewares/authenticate");

const ingredientController = require("../../controllers/ingredientController");
const router = express.Router();

router.use(authenticate);
router.get('/list', ingredientController.ingredientList);
router.get("/:query", ingredientController.findRecipesByIngredient);

module.exports = router;