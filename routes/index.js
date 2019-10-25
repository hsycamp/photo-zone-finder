const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("../auth/auth");
const indexController = require("../controller/index-controller");

/* GET home page. */
router.get("/", isLoggedIn, indexController.getIndexPage);

/* GET signIn page. */
router.get("/sign-in", isNotLoggedIn, indexController.getSignInPage);

/* GET signUP page. */
router.get("/sign-up", isNotLoggedIn, indexController.getSignUpPage);

/* GET my page */
router.get("/my-page", isLoggedIn, indexController.getMyPage);

module.exports = router;
