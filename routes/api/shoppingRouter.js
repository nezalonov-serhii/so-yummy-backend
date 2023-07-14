const express = require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const shoppingController = require("../../controllers/shoppingController");

router.use(authenticate)

router.get('/', shoppingController.getShopping)


module.exports = router;