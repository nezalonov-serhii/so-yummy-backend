const express = require('express');
const router = express.Router();
const shoppingList = require('../../controllers/shoppingList');
const authenticate = require('../../middlewares/authenticate');

router.use(authenticate);
router.get('/', shoppingList.getIngredientsFromShoppingList);
router.post('/', shoppingList.addIngredientsInShoppingList);
router.delete('/:id', shoppingList.removeIngredientsFromShoppingList);

module.exports = router;