const express = require("express");
const router = express.Router();
const userController = require("../controller/user-controller");

/* local signUp. */
router.post("/local", userController.signUp);

module.exports = router;
