const express = require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const ownRecipesController = require("../../controllers/onwRecipesController");
const { upload } = require("../../middlewares/avatarsMiddleware");

router.use(authenticate);
/**
 * @openapi
 * tags:
 *  name: Own-recipes
 *  description: Managing recipes, created by current user
 */

/**
 * @openapi
 * /own-recipes:
 *  get:
 *    summary: Allows user to get all recipes, created by this user
 *    tags: [Own-recipes]
 *    responses:
 *      200:
 *        description: Data loaded successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      ownRecipes:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/Recipe"
 */

router.get("/", ownRecipesController.getOwnRecipes);

/**
 * @openapi
 * /own-recipes:
 *  post:
 *    summary: Allows user to save own recipe
 *    tags: [Own-recipes]
 *    requestBody:
 *      required: true
 *      content:
 *       multipart/form-data:
 *        schema:
 *         $ref: "#/components/schemas/OwnRecipeAdd"
 *    responses:
 *      201:
 *        description: Recipe created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  $ref: "#/components/schemas/Recipe"
 */

router.post("/", upload.single("image"), ownRecipesController.postOwnRecipe);

/**
 * @openapi
 * /own-recipes/{id}:
 *  patch:
 *      summary: Allows user to delete own recipe from DB and own profile
 *      tags: [Own-recipes]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Onw recipe deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *
 */

router.patch("/:id", ownRecipesController.deleteOwnRecipe);

module.exports = router;
