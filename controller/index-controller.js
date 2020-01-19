const db = require("../mysql-models");

const indexController = {
  getIndexPage: async (req, res) => {
    const posts = await db.Post.getAllPosts();
    res.render("index", { user: req.user, posts: posts });
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
  getPostPage: (req, res) => {
    const flashMessage = req.flash("message");
    res.render("post", {
      title: "게시물 업로드 페이지",
      user: req.user,
      errorMessage: flashMessage
    });
  },
  getUserPage: async (req, res) => {
    const userName = req.params.userName;
    const userData = await db.User.getUserData(userName, db);
    const flashMessage = req.flash("message");
    res.render("user-page", {
      title: "유저 페이지",
      user: req.user,
      userData,
      errorMessage: flashMessage
    });
  }
};

module.exports = indexController;
