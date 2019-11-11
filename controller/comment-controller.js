const Post = require("../models/post");
const Comment = require("../models/comment");

const commentController = {
  addComment: async (req, res) => {
    const user = req.user;
    const { text, postNumber } = req.body;
    const post = await Post.findById(postNumber);
    const comment = await Comment.create({
      content: text,
      publisher: user
    });

    post.comments.push(comment);
    post.save();

    return res.json(comment);
  }
};

module.exports = commentController;
