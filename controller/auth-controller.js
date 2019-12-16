const User = require("../models/user");
const googleOauth = require("../auth/google-oauth");
const generateJwt = require("../util/jwt-token-generator");

const authController = {
  signIn: async (req, res, next) => {
    const { userId, password } = req.body;
    const user = await User.findUser(userId, "local");
    if (!user) {
      req.flash("message", "존재하지 않는 아이디입니다.");
      return res.redirect("/sign-in");
    }
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      req.flash("message", "비밀번호가 틀렸습니다.");
      return res.redirect("/sign-in");
    }

    const userInfo = { _id: user._id, userName: user.userName };
    await generateJwt(res, userInfo);

    return res.redirect("/");
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
      const user = await User.findUser(googleId, "google");

      if (!user) {
        const signUpData = { userId: googleId, authProvider: "google" };
        return res.render("oauth-sign-up", { signUpData });
      }

      const userInfo = { _id: user._id, userName: user.userName };
      await generateJwt(res, userInfo);

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
