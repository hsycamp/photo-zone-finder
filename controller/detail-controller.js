const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const db = require("../mysql-models");

const detailController = {
  getDetailPage: async (req, res) => {
    const postId = req.params.postId;
    const posts = await db.Post.getPostWithCommentsByPostId(postId, db);
    req.user.islikedPost = posts[0]["liker.id"];
    res.render("detail-page", {
      user: req.user,
      posts
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
    const userObjectId = req.user;
    const postId = req.params.postId;
    const islikedPost = await User.checkLikedPost(userObjectId, postId);
    if (islikedPost) {
      const unLikedPost = await Post.unLikePost(postId);
      await User.removeLikedPostId(userObjectId, unLikedPost._id);
      const updateResult = {
        updatedStatus: "unliked",
        likesCount: unLikedPost.likes
      };
      return res.json(updateResult);
    }
    const likedPost = await Post.likePost(postId);
    await User.addLikedPostId(userObjectId, likedPost._id);
    const updateResult = {
      updatedStatus: "liked",
      likesCount: likedPost.likes
    };
    return res.json(updateResult);
  }
};

module.exports = detailController;
