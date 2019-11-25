const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../auth/auth");
const detailController = require("../controller/detail-controller");

router.get("/:postId", isLoggedIn, detailController.getDetailPage);

module.exports = router;
