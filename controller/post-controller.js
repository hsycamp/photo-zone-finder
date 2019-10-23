const User = require("../models/user");
const Post = require("../models/post");

const postController = {
  uploadImage: async (req, res, next) => {
    try {
      const content = req.file.location;
      const userId = req.user;
      const user = await User.findOne({ id: userId });
      const post = await Post.create({
        content: content,
        publisher: user
      });
      user.posts.push(post._id);
      user.save();
      return res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
};

module.exports = postController;
