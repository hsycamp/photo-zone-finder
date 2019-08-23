const express = require("express");
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/* local signUp. */
router.post("/local", (req, res, next) => {
  passport.authenticate("sign-up", (err, user, info) => {
    if (err) return res.json(401, error);
    if (info) {
      req.flash("message", info.message);
      return res.status(401).redirect("/sign-up");
    }
    return res.redirect("/sign-in");
  })(req, res, next);
});

module.exports = router;
