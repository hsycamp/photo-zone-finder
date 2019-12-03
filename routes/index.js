const express = require("express");
const asyncify = require("express-asyncify");
const router = asyncify(express.Router());
const { isLoggedIn, isNotLoggedIn } = require("../auth/auth");
const indexController = require("../controller/index-controller");

/* GET home page. */
router.get("/", isLoggedIn, indexController.getIndexPage);

/* GET signIn page. */
router.get("/sign-in", isNotLoggedIn, indexController.getSignInPage);

/* GET signUP page. */
router.get("/sign-up", isNotLoggedIn, indexController.getSignUpPage);

/* GET user page */
router.get("/user-page/:publisherId", isLoggedIn, indexController.getUserPage);

/* GET post page */
router.get("/post", isLoggedIn, indexController.getPostPage);

module.exports = router;
