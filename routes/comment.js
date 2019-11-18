const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment-controller");

router.post("/", commentController.addComment);
router.delete("/:commentId", commentController.deleteComment);

module.exports = router;
