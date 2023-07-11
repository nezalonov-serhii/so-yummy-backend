const express = require("express");
const router = express.Router();
const authenticate = require('../../middlewares/authenticate')
const favoriteRecepiesController = require('../../controllers/favoriteRecipesController')

router.use(authenticate)
router.post('/:id', favoriteRecepiesController.addRecepiesToFavorite)


module.exports = router;