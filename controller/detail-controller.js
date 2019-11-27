const Post = require("../models/post");
const Comment = require("../models/comment");

const detailController = {
  getDetailPage: async (req, res) => {
    const userId = req.user;
    const postId = req.params.postId;
    const post = await Post.getPostByPostId(postId);
    const comments = await Comment.getCommentsByPostId(postId);
    res.render("detail-page", {
      user: { id: userId },
      post,
      comments
    });
  },

  getUpdatePage: async (req, res) => {
    const userId = req.user;
    const postId = req.params.postId;
    const post = await Post.getPostByPostId(postId);
    const text = post.text;
    res.render("post-update", {
      user: { id: userId },
      text
    });
  },

  updatePost: async (req, res) => {
    const postId = req.params.postId;
    const updateText = req.body.updateText;
    await Post.updatePost(postId, updateText);
    return res.json("success");
  },

  deletePost: async (req, res) => {
    const postId = req.params.postId;
    await Post.deletePost(postId);
    return res.json("success");
  }
};

module.exports = detailController;
