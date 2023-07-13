const express = require("express");
const authenticate = require('../../middlewares/authenticate')
const recipeController = require('../../controllers/recipeController')
const router = express.Router();
const {checkReqParams} = require('../../helpers')

router.use(authenticate)

/**
 * @openapi
 * tags:
 *  name: Recipes
 *  description: Recipes routes to manage recipes
 */

/**
 * @openapi
 * /recipes:
 *  get:
 *    summary: Allows user and applicaion to get all recipes from db
 *    tags: [Recipes]
 *    responses:
 *      200:
 *        description: Data loaded successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  $ref: "#/components/schemas/Recipe"
 */

router.get('/', recipeController.getAllRecipes)

/**
 * @openapi
 * /recipes/category-list:
 *  get:
 *    summary: Allows application to get a last of recipes categories
 *    tags: [Recipes]
 *    responses:
 *      200:
 *        description: Lisr of categories loaded successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: string
 *              example: ["Beef", "Pork"]
 */

router.get('/category-list', recipeController.getCategoriesList)

/**
 * @openapi
 * /recipes/main-page:
 *  get:
 *    summary: Brings recipes for render on main page, returns by 4 recipes in 4 categories
 *    tags: [Recipes]
 *    responses:
 *      200:
 *        description: List of recipes' objects
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  mainpage:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string 
 *                        title:
 *                          type: string 
 *                        thumb:
 *                          type: string 
 *                        preview:
 *                          type: string 
 *                        category:
 *                          type: string
 */

router.get('/main-page', recipeController.mainPageRecipes)

/**
 * @openapi
 * /recipes/{category}:
 *  get:
 *    summary: Brings recipes for render on main page, returns by 4 recipes in 4 categories
 *    tags: [Recipes]
 *    parameters:
 *      - in: path
 *        name: category
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: List of recipes by defined category
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Category"
 */

router.get('/:category', checkReqParams, recipeController.getRecipeByCategory)


/**
 * @openapi
 * /recipes/{id}:
 *  get:
 *    summary: Brings recipes for render on main page, returns by 4 recipes in 4 categories
 *    tags: [Recipes]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: List of recipes by defined category
 *        content:
 *          application/json:
 *            schema:
 *                $ref: "#/components/schemas/Recipe"
 */

router.get('/:id', recipeController.getRecipeById)

module.exports = router;


/*

paths:
/recipes:
  get:
      tags:
        - Recipes
      summary: Allows to get all recipes from db
      operationId: getAll
      description: |
        Route brings all available recipes from db. 
      responses:
        '200':
          description: Successful get request
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Recipes'
        '401':
            description: Unauthorized


 


          
          
          
          
          
          

 /recipes/{id}:
  get:
      tags:
        - Recipes
      summary: Allows to get single recipe from db
      operationId: getOne
      parameters:
        - name: id
          in: path
          required: true
          description: id of selected recipe
          schema:
            type: string
            
        
      description: |
        Route brings selected recipe from db. 
      responses:
        '200':
          description: Successful get request
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Recipe'
        '401':
          description: Unauthorized

*/