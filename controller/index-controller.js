const Post = require("../models/post");
const User = require("../models/user");

const indexController = {
  getIndexPage: async (req, res) => {
    const userId = req.user;
    const posts = await Post.getAllPosts();
    res.render("index", { user: { id: userId }, posts: posts });
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
    const userId = req.user;
    const flashMessage = req.flash("message");
    res.render("post", {
      title: "게시물 업로드 페이지",
      user: { id: userId },
      errorMessage: flashMessage
    });
  },
  getMyPage: async (req, res) => {
    const userId = req.user;
    const userData = await User.getUserData(userId);
    const flashMessage = req.flash("message");
    res.render("my-page", {
      title: "마이 페이지",
      user: userData,
      errorMessage: flashMessage
    });
  }
};

module.exports = indexController;
