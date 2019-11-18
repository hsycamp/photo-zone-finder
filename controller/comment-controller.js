const Post = require("../models/post");
const Comment = require("../models/comment");

const commentController = {
  addComment: async (req, res) => {
    const user = req.user;
    const { text, postId } = req.body;
    const comment = await Comment.create({
      postId,
      content: text,
      publisher: user
    });

    return res.json(comment);
  },

  deleteComment: async (req, res) => {
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);

    comment.display = false;
    comment.save();

    return res.json("success");
  }
};

module.exports = commentController;
