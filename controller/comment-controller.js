const Post = require("../models/post");
const Comment = require("../models/comment");

const commentController = {
  addComment: async (req, res) => {
    const user = req.user;
    const { text, postId } = req.body;
    const commentData = { text, postId, user };
    const newComment = await Comment.createComment(commentData);

    return res.json(newComment);
  },

  deleteComment: async (req, res) => {
    const commentId = req.params.commentId;
    await Comment.deleteComment(commentId);

    return res.json("success");
  }
};

module.exports = commentController;
