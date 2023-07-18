const express = require("express");
const router = express.Router();
const authenticate = require('../../middlewares/authenticate')
const favoriteRecepiesController = require('../../controllers/favoriteRecipesController')

router.use(authenticate)
/**
 * @openapi
 * tags:
 *  name: Favorites
 *  description: Allows users to manage favorite recipes, i.e. add to favorite or delete
 */

/**
 * @openapi
 * /favorite/{id}:
 *    post:
 *      tags: [Favorites]
 *      summary: Allows user to save defined recipe to favorites collection
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          201:
 *              description: Defined recipe added to user's favorite collection
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              recipe:
 *                                  $ref: "#/components/schemas/Recipe" 
 *          
 *          401:
 *              description: User is not authorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Error"
 *          404:
 *              description: Item or user not not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Error"
 *          409:
 *              description: Recipe is already added to user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Error"
 */
router.post('/:id', favoriteRecepiesController.addRecepiesToFavorite)

/**
 * @openapi
 *  /favorite:
 *      get:
 *          tags: [Favorites]
 *          summary: Returns collection of user's favorite recipes
 *          responses:
 *              200:
 *                  description: Favorite recipes found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  favoriteRecipes:
 *                                      type: array
 *                                      items:
 *                                          $ref: "#/components/schemas/Recipe"
 *              401:
 *                 description: User is not authorized
 *                 content:
 *                    application/json:
 *                        schema:
 *                            $ref: "#components/schemas/Error"
 */

router.get('/', favoriteRecepiesController.getFavoriteRecipes)

/**
 * @openapi
 *  /favorite/{id}:
 *      delete:
 *          tags: [Favorites]
 *          summary: Allows user to delete recipe from favorites collection
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                shema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Defined recipe was deleted from user's favorite recipes collection
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                  recipe:
 *                                      type: array
 *                                      items:
 *                                         $ref: "#/components/schemas/Recipe"
 */

router.delete('/:id', favoriteRecepiesController.removeFavoriteRecipe )


module.exports = router;