const express = require("express");
const router = express.Router();
const detailController = require("../controller/detail-controller");

router.get("/:postId", detailController.getDetailPage);

module.exports = router;
