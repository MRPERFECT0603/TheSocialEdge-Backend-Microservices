const express = require("express");
const { sendNotification } = require("../Controllers/notificationController");

const router = express.Router();

router.post("/" , sendNotification);

module.exports = router;


