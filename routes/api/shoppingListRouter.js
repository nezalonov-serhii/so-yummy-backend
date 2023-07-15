const express = require('express');
const router = express.Router();
const shoppingList = require('../../controllers/shoppingList');

router.get('/', shoppingList.getIngredientsFromShoppingList);
router.post('/', shoppingList.addIngredientsInShoppingList);
router.delete('/:contactId', shoppingList.removeIngredientsFromShoppingList);

module.exports = router;