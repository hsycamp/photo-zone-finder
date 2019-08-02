const express = require("express");
const router = express.Router();
const passport = require("passport");

/* GET signIn page. */
router.get("/", function(req, res, next) {
  const flashMessage = req.flash();
  const errorMessage = flashMessage.error;
  res.render("sign-in", { title: "로그인 페이지", errorMessage });
});

/* local signIn. */
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/sign-in",
    failureFlash: true
  }),
  function(req, res) {
    res.redirect("/");
  }
);

module.exports = router;
