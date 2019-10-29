const express = require("express");
const router = express.Router();
const detailController = require("../controller/detail-controller");

router.get("/:postNumber", detailController.getDetailPage);

module.exports = router;
