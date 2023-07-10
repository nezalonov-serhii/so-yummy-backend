const express = require("express");
const router = express.Router();
const authenticate = require('../../middlewares/authenticate')
const searchController = require('../../controllers/searchController')
// const bodyParser = require('body-parser');

// router.use(bodyParser.json()); // <-- add the JSON parser
router.use(authenticate)
router.get('/', searchController.searchByQuery)

module.exports = router;