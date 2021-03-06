const express = require("express");
const asyncify = require("express-asyncify");
const router = asyncify(express.Router());
const { isLoggedIn } = require("../auth/auth");
const detailController = require("../controller/detail-controller");

router.get("/:postId", isLoggedIn, detailController.getDetailPage);
router.get("/update/:postId", isLoggedIn, detailController.getUpdatePage);
router.patch("/:postId", isLoggedIn, detailController.updatePost);
router.patch("/like/:postId", isLoggedIn, detailController.updateLike);
router.get("/like/:postId", isLoggedIn, detailController.getLikers);
router.delete("/:postId", isLoggedIn, detailController.deletePost);

module.exports = router;
