const express = require("express");
const router = express.Router();
const passport = require("passport");

/* local signIn. */
router.post(
  "/local",
  passport.authenticate("local", {
    failureRedirect: "/sign-in",
    failureFlash: true,
    successRedirect:"/"
  })
);

module.exports = router;
