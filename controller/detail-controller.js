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
  }
};

module.exports = detailController;
