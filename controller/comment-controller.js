const Post = require("../models/post");
const Comment = require("../models/comment");

const commentController = {
  addComment: async (req, res) => {
    const userObjectId = req.user._id;
    const { text, postId } = req.body;
    const commentData = { text, postId, userObjectId };
    const newCommentData = await Comment.createComment(commentData);
    const addResult = { newCommentData, publisherName: req.user.userName };

    return res.json(addResult);
  },

  deleteComment: async (req, res) => {
    const commentId = req.params.commentId;
    await Comment.deleteComment(commentId);

    return res.end();
  }
};

module.exports = commentController;
