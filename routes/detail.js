const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../auth/auth");
const detailController = require("../controller/detail-controller");

router.get("/:postId", isLoggedIn, detailController.getDetailPage);
router.get("/update/:postId", isLoggedIn, detailController.getUpdatePage);
router.delete("/:postId", isLoggedIn, detailController.deletePost);

module.exports = router;
