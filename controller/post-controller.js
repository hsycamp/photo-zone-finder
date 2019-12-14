const User = require("../models/user");
const Post = require("../models/post");

const postController = {
  uploadImage: async (req, res, next) => {
    try {
      const content = req.file.location;
      const userObjectId = req.user._id;
      const text = req.body.text;
      const postData = { content, text, userObjectId };
      const post = await Post.createPost(postData);
      await User.addPostId(userObjectId, post._id);

      return res.redirect(`/detail/${post._id}`);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = postController;
