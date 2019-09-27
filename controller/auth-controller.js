const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config");

const authController = {
  signIn: (req, res, next) => {
    passport.authenticate(
      "sign-in",
      {
        session: false
      },
      async (err, user, info) => {
        try {
          if (err) return res.json(401, error);
          if (info) {
            req.flash("message", info.message);
            return res.status(401).redirect("/sign-in");
          }
          req.login(user, { session: false }, async err => {
            if (err) return next(err);
            const token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: "7d"
            });
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 10
            });
            console.log(token);
            return res.redirect("/");
          });
        } catch (err) {
          return next(err);
        }
      }
    )(req, res, next);
  },
  signOut: (req, res, next) => {
    res.clearCookie("token", { path: "/" });
    return res.redirect("/sign-in");
  }
};

module.exports = authController;
