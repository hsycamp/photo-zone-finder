const User = require("../models/user");

const indexController = {
  getIndexPage: (req, res) => {
    const userId = req.user;
    res.render("index", { user: userId });
  },
  getSignInPage: (req, res) => {
    const flashMessage = req.flash("message");
    res.render("sign-in", {
      title: "로그인 페이지",
      errorMessage: flashMessage
    });
  },
  getSignUpPage: (req, res) => {
    const flashMessage = req.flash("message");
    res.render("sign-up", {
      title: "회원가입 페이지",
      errorMessage: flashMessage
    });
  },
  getMyPage: async (req, res) => {
    const userId = req.user;
    const user = await User.findOne({ id: userId }).populate({
      path: "posts"
    });
    const flashMessage = req.flash("message");
    res.render("my-page", {
      title: "마이 페이지",
      user: user,
      errorMessage: flashMessage
    });
  }
};

module.exports = indexController;
