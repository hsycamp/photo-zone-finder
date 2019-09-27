const express = require("express");
const router = express.Router();
const indexController = require("../controller/index-controller");

/* GET home page. */
router.get("/", indexController.getIndexPage);

/* GET signIn page. */
router.get("/sign-in", indexController.getSignInPage);

/* GET signUP page. */
router.get("/sign-up", indexController.getSignUpPage);

module.exports = router;
