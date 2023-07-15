const express = require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const shoppingController = require("../../controllers/shoppingController");

router.use(authenticate)

router.get('/', shoppingController.getShopping)
router.post('/', shoppingController.addIngridientToShopping)
router.delete('/:id',shoppingController.removeIngridientFromShoppingList)

module.exports = router;