const express = require("express");
const { stripeController } = require("../controllers");

const router = express.Router();

router.post("/webhook", stripeController.webhookHandler);

module.exports = router;
