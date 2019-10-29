const Post = require("../models/post");

const detailController = {
  getDetailPage: async (req, res) => {
    const userId = req.user;
    const post = await Post.findById(req.params.postNumber);
    res.render("detail-page", {
      user: { id: userId },
      post
    });
  }
};

module.exports = detailController;
