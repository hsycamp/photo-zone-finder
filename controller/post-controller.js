const db = require("../mysql-models");

const postController = {
  uploadImage: async (req, res, next) => {
    try {
      const content = req.file.location;
      const userObjectId = req.user._id;
      const text = req.body.text;
      const postData = { content, text, userObjectId };
      const post = await db.Post.createPost(postData);
      return res.redirect(`/detail/${post.id}`);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = postController;
