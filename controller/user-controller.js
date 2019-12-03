const passport = require("passport");

const userController = {
  signUp: (req, res, next) => {
    passport.authenticate("sign-up", (error, user, info) => {
      if (error) return next(error);
      if (info) {
        req.flash("message", info.message);
        return res.status(401).redirect("/sign-up");
      }
      return res.redirect("/sign-in");
    })(req, res, next);
  }
};

module.exports = userController;
