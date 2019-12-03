const passport = require("passport");
const jwt = require("jsonwebtoken");
const googleOauth = require("../auth/google-oauth");
const Users = require("../models/user");

const authController = {
  signIn: (req, res, next) => {
    passport.authenticate(
      "sign-in",
      {
        session: false
      },
      async (error, user, info) => {
        try {
          if (error) return next(error);
          if (info) {
            req.flash("message", info.message);
            return res.status(401).redirect("/sign-in");
          }
          req.login(user, { session: false }, async error => {
            if (error) return next(error);
            const token = jwt.sign({ id: user.id }, process.env.SECRET, {
              expiresIn: "7d"
            });
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 10
            });
            console.log(token);
            return res.redirect("/");
          });
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  },

  googleSignIn: (req, res, next) => {
    return res.redirect(googleOauth.url);
  },

  googleSignInCallback: async (req, res, next) => {
    try {
      const code = req.query.code;

      const { tokens } = await googleOauth.oauth2Client.getToken(code);
      googleOauth.oauth2Client.setCredentials(tokens);
      const plus = googleOauth.getGooglePlusApi(googleOauth.oauth2Client);
      const me = await plus.people.get({ userId: "me" });

      const email = me.data.emails[0].value;
      const googleId = email.split("@")[0];
      const userId = await Users.findOne({ "auth.googleId": googleId });

      if (!userId) {
        await Users.create({ "auth.googleId": googleId });
      }

      req.user = googleId;
      const token = jwt.sign({ id: googleId }, process.env.SECRET, {
        expiresIn: "7d"
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 10
      });
      return res.redirect("/");
    } catch (error) {
      next(error);
    }
  },

  signOut: (req, res, next) => {
    res.clearCookie("token", { path: "/" });
    return res.redirect("/sign-in");
  }
};

module.exports = authController;
