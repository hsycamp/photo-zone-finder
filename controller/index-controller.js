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
  getUserPage: async (req, res) => {
    const userId = req.user;
    const publisherId = req.params.publisherId;
    const publisherData = await User.getUserData(publisherId);
    const flashMessage = req.flash("message");
    res.render("user-page", {
      title: "유저 페이지",
      user: { id: userId },
      publisherData,
      errorMessage: flashMessage
    });
  }
};

module.exports = indexController;
