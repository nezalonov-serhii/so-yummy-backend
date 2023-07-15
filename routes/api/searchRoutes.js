const express = require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const searchController = require("../../controllers/searchController");
const {validateBody} = require('../../middlewares/validateBody')
const schemas = require('../../schemas/validation')

// router.use(bodyParser.json()); // <-- add the JSON parser
router.use(authenticate);
/**
 * @openapi
 * tags:
 *  name: Search
 *  description: Search recipe by title or ingredient
 */

/**
 * @openapi
 * /search:
 *  post:
 *    summary: Search recipes, matching search query
 *    tags: [Search]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      query:
 *                          type: string
 *    responses:
 *      200:
 *          description: Recipes found
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
 *                              $ref: "#/components/schemas/Recipe"
 *      404:
 *          description: Such recipe not found
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:
 *                              type: integer
 *                          message:
 *                              type: string
 */
router.post("/", validateBody(schemas.searchQueryValidation), searchController.searchByQuery);

module.exports = router;
