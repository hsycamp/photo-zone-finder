const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const SECRET = "token_secret";

/* local signIn. */
router.post("/local", (req, res, next) => {
  passport.authenticate("sign-in", (err, user, info) => {
    if (err) return res.json(401, error);
    if (info) {
      req.flash("message", info.message);
      return res.status(401).redirect("/sign-in");
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: "7d"
      });
      console.log(token);
      return res.json({ access_token: token });
    });
  })(req, res, next);
});

module.exports = router;
