const express = require("express");
const router = express.Router();
const postController = require("../controller/post-controller");
const upload = require("../util/multer-upload");

router.post("/img", upload.single("img"), postController.uploadImage);

module.exports = router;
