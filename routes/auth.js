const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");

/* local signIn. */
router.post("/local", authController.signIn);

router.get("/google", authController.googleSignIn);

router.get("/google/callback", authController.googleSignInCallback);

router.post("/sign-out", authController.signOut);

module.exports = router;
