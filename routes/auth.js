const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");

/* local signIn. */
router.post("/local", authController.signIn);

router.post("/sign-out", authController.signOut);

module.exports = router;
