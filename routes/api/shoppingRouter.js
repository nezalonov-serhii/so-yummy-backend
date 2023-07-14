const express = require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const shoppingController = require("../../controllers/shoppingController");

router.use(authenticate)

router.get('/', shoppingController.getShopping)
router.post('/:id', shoppingController.addIngridientToShopping)


module.exports = router;