const express = require("express");
const asyncify = require("express-asyncify");
const router = asyncify(express.Router());
const { isLoggedIn } = require("../auth/auth");
const postController = require("../controller/post-controller");
const upload = require("../util/multer-upload");

router.post(
  "/img",
  isLoggedIn,
  upload.single("img"),
  postController.uploadImage
);

module.exports = router;
