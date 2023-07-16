const express = require("express");
const router = express.Router();
const authenticate = require('../../middlewares/authenticate');
const subscribeController = require("../../controllers/subscribeController");

router.use(authenticate)

/**
 * @openapi
 * tags:
 *  name: Subscription
 *  description: Allows user to subscribe for updates via email
 */


/**
 * @openapi
 * /:
 *  post:
 *    summary: Sharing email for subscription
 *    tags: [Subscription]
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         required: [email]
 *         properties:
 *              email:
 *                  type: string
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                     type: string
 */

router.post('/', subscribeController.subscribeController)

module.exports = router;