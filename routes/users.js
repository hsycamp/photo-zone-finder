const express = require("express");
const asyncify = require("express-asyncify");
const router = asyncify(express.Router());
const { isLoggedIn, isNotLoggedIn } = require("../auth/auth");
const userController = require("../controller/user-controller");

/* local signUp. */
router.post("/", isNotLoggedIn, userController.signUp);
router.get("/:userName", isNotLoggedIn, userController.checkDuplicateUserName);
router.post("/follow/:userName", isLoggedIn, userController.addFollow);

module.exports = router;
