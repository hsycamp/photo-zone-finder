const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../auth/auth");
const commentController = require("../controller/comment-controller");

router.post("/", isLoggedIn, commentController.addComment);
router.delete("/:commentId", isLoggedIn, commentController.deleteComment);

module.exports = router;
