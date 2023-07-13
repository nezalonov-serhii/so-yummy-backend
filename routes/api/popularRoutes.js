const express = require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const popularController = require("../../controllers/popularController");

router.use(authenticate);
router.get("/", popularController.popularRecipes);

module.exports = router;
