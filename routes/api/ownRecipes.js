const express = require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const ownRecipesController = require("../../controllers/onwRecipesController");
const { upload } = require("../../middlewares/avatarsMiddleware");

router.use(authenticate);
router.get("/", ownRecipesController.getOwnRecipes);
router.post("/", upload.single("image"), ownRecipesController.postOwnRecipe);
router.patch("/:id", ownRecipesController.deleteOwnRecipe);

module.exports = router;
