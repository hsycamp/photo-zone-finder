const express = require("express");
const router = express.Router();
const { isNotLoggedIn } = require("../auth/auth");
const userController = require("../controller/user-controller");

/* local signUp. */
router.post("/local", isNotLoggedIn, userController.signUp);

module.exports = router;
