const express = require("express");
const { getPosts, addPost, deletePost } = require("../Controllers/postController");

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/", deletePost);

module.exports = router;