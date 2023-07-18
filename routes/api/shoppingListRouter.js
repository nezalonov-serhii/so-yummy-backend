const express = require('express');
const router = express.Router();
const shoppingList = require('../../controllers/shoppingList');
const authenticate = require('../../middlewares/authenticate');

router.use(authenticate);

/**
 * @openapi
 * tags:
 *  name: Shopping
 *  description: Allows user to create shoplist of ingredients of recipes
 */

/**
 * @openapi
 * /shopping-list:
 *  get:
 *    summary: Brings user's shopping list of selected ingredients
 *    tags: [Shopping]
 *    responses:
 *      200:
 *          description: Shopping list available
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              ingredient:
 *                                  type: string
 *                              measure:
 *                                  type: string
 *      404:
 *          description: Shopping list is empty
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 */

router.get('/', shoppingList.getIngredientsFromShoppingList);

/**
 * @openapi
 * /shopping-list:
 *  post:
 *    summary: Saving certain ingredient to shopping list
 *    tags: [Shopping]
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         required: [ingredient, measure]
 *         properties:
 *              ingredient:
 *                  type: string
 *              measure:
 *                  type: string
 *    responses:
 *      200:
 *        description: Ingredient saved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      ingredient:
 *                          type: string
 *                      measure:
 *                          type: string
 *      404:
 *          description: Ingredient not found
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Error"
 */


router.post('/', shoppingList.addIngredientsInShoppingList);


/**
 * @openapi
 * /shopping-list/{id}:
 *  delete:
 *    summary: Delete certain ingredient from shopping list
 *    tags: [Shopping]
 *    parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *              type: string
 *    responses:
 *      200:
 *        description: Delete successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 */


router.delete('/:id', shoppingList.removeIngredientsFromShoppingList);


module.exports = router;