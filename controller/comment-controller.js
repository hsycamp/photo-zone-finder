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
  }
};

module.exports = commentController;
