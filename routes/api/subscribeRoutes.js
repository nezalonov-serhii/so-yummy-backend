const express = require("express");
const router = express.Router();
const authenticate = require('../../middlewares/authenticate');
const subscribeController = require("../../controllers/subscribeController");

router.use(authenticate)
router.post('/', subscribeController.subscribeController)

module.exports = router;