const express = require("express");
const asyncify = require("express-asyncify");
const router = asyncify(express.Router());
const { isLoggedIn, isNotLoggedIn } = require("../auth/auth");
const authController = require("../controller/auth-controller");

/* local signIn. */
router.post("/local", isNotLoggedIn, authController.signIn);

router.get("/google", isNotLoggedIn, authController.googleSignIn);

router.get(
  "/google/callback",
  isNotLoggedIn,
  authController.googleSignInCallback
);

router.post("/sign-out", isLoggedIn, authController.signOut);

module.exports = router;
