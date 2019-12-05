const User = require("../models/user");
const jwt = require("jsonwebtoken");
const googleOauth = require("../auth/google-oauth");

const authController = {
  signIn: async (req, res, next) => {
    const { id, password } = req.body;
    const user = await User.findUser(id);
    if (!user) {
      req.flash("message", "존재하지 않는 아이디입니다.");
      return res.redirect("/sign-in");
    }
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      req.flash("message", "비밀번호가 틀렸습니다.");
      return res.redirect("/sign-in");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "7d"
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 10
    });
    console.log(token);
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
      const userId = await User.findOne({ "auth.googleId": googleId });

      if (!userId) {
        await User.create({ "auth.googleId": googleId });
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
