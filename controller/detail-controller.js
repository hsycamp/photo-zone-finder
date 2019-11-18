const Post = require("../models/post");
const Comment = require("../models/comment");

const detailController = {
  getDetailPage: async (req, res) => {
    const userId = req.user;
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    const comments = await Comment.find({
      postId,
      display: true
    });
    res.render("detail-page", {
      user: { id: userId },
      post,
      comments
    });
  }
};

module.exports = detailController;
