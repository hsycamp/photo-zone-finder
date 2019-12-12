const express = require("express");
const asyncify = require("express-asyncify");
const router = asyncify(express.Router());
const { isNotLoggedIn } = require("../auth/auth");
const userController = require("../controller/user-controller");

/* local signUp. */
router.post("/", isNotLoggedIn, userController.signUp);
router.get("/:userName", isNotLoggedIn, userController.checkDuplicateUserName);

module.exports = router;
