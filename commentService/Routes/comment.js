const express = require("express");
const { getComments, addComments } = require("../Controllers/commentController");

const router = express.Router();

router.get("/", getComments);
router.post("/", addComments);




module.exports = router;


