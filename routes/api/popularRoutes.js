const express = require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const popularController = require("../../controllers/popularController");

router.use(authenticate);

/**
 * @openapi
 * tags:
 *  name: Popular
 *  description: Brings list of popular recipes.
 */

/**
 * @openapi
 *  /popular-recipe:
 *      get:
 *          summary: Returns list of 4 most popular recipes
 *          tags: [Popular]
 *          responses:
 *              200:
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
 *                                      items:
 *                                          $ref: "#/components/schemas/Recipe"
 */
router.get("/", popularController.popularRecipes);

module.exports = router;
