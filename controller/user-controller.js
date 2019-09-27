const passport = require("passport");

const userController = {
  signUp: (req, res, next) => {
    passport.authenticate("sign-up", (err, user, info) => {
      if (err) return res.json(401, error);
      if (info) {
        req.flash("message", info.message);
        return res.status(401).redirect("/sign-up");
      }
      return res.redirect("/sign-in");
    })(req, res, next);
  }
};

module.exports = userController;
