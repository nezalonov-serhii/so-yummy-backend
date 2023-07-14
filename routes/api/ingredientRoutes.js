const express = require("express");
const authenticate = require("../../middlewares/authenticate");

const ingredientController = require("../../controllers/ingredientController");
const router = express.Router();

router.use(authenticate);
/**
 * @openapi
 * tags:
 *  name: Ingredients
 *  description: Brings stored ingredients
 */

/**
 * @openapi
 * /ingredients/list:
 *   get:
 *      tags: [Ingredients]
 *      summary: Returns a list of available ingredients
 *      responses:
 *       200:
 *          description: Array of ingredients
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:
 *                              type: integer
 *                          message:
 *                              type: string
 *                          data:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Ingredient"
 *                          qty:
 *                              type: integer
 */
router.get("/list", ingredientController.ingredientList);

/**
 * @openapi
 *  /ingredients:
 *      post:
 *          tags: [Search]
 *          summary: Search recipes, containing defined ingredient
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              query:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Returns list of recipes, status, quantity of found documents   
 *                  content:   
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                  message:
 *                                      type: string
 *                                  data:
 *                                      type: array
 *                                  items:
 *                                      $ref: "#/components/schemas/Ingredient"
 *                                  qty:
 *                                      type: integer
 *              404:
 *                  description: Recipes not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 */

router.post("/", ingredientController.findRecipesByIngredient);

module.exports = router;
