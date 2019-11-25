const User = require("../models/user");
const Post = require("../models/post");

const postController = {
  uploadImage: async (req, res, next) => {
    try {
      const content = req.file.location;
      const userId = req.user;
      const text = req.body.text;
      const postData = { content, text, userId };
      const post = await Post.createPost(postData);
      await User.addPostId(userId, post._id);

      return res.redirect(`/detail/${post._id}`);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = postController;
