const db = require("../mysql-models");

const detailController = {
  getDetailPage: async (req, res) => {
    const userObjectId = req.user._id;
    const postId = req.params.postId;
    const postWithComments = await db.Post.getPostWithCommentsByPostId(
      postId,
      db
    );
    const post = await db.Post.findOne({ where: { id: postId } });
    const isLiker = await post.getLiker({
      where: { id: userObjectId },
      attributes: ["userName"]
    });
    req.user.islikedPost = isLiker.length === 1;

    const likers = await post.getLiker({
      attributes: ["userName"]
    });

    res.render("detail-page", {
      user: req.user,
      post: postWithComments,
      likers
    });
  },

  getUpdatePage: async (req, res) => {
    const postId = req.params.postId;
    const post = await db.Post.getPostByPostId(postId);
    const text = post.text;
    res.render("post-update", {
      user: req.user,
      text
    });
  },

  updatePost: async (req, res) => {
    const postId = req.params.postId;
    const updateText = req.body.updateText;
    await db.Post.updatePost(postId, updateText);
    return res.end();
  },

  deletePost: async (req, res) => {
    const postId = req.params.postId;
    await db.Post.deletePost(postId);
    return res.end();
  },

  updateLike: async (req, res) => {
    const userObjectId = req.user._id;
    const postId = req.params.postId;
    const post = await db.Post.findOne({ where: { id: postId } });
    const isLiker = await post.getLiker({
      raw: true,
      where: { id: userObjectId },
      attributes: ["userName"]
    });
    const islikedPost = isLiker.length === 1;

    if (islikedPost) {
      await post.removeLiker(userObjectId);
      const likers = await post.getLiker({
        attributes: ["userName"]
      });
      const updateResult = {
        updatedStatus: "unliked",
        likesCount: likers.length
      };
      return res.json(updateResult);
    }

    await post.addLiker(userObjectId);
    const likers = await post.getLiker({
      attributes: ["userName"]
    });
    const updateResult = {
      updatedStatus: "liked",
      likesCount: likers.length
    };
    return res.json(updateResult);
  },

  getLikers: async (req, res) => {
    const postId = req.params.postId;
    const post = await db.Post.findOne({ where: { id: postId } });
    const likers = await post.getLiker({
      attributes: ["userName"]
    });
    return res.json(likers);
  }
};

module.exports = detailController;
