const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

const detailController = {
  getDetailPage: async (req, res) => {
    const userId = req.user;
    const postId = req.params.postId;
    const islikedPost = await User.findLikedPost(userId, postId);
    const post = await Post.getPostByPostId(postId);
    const comments = await Comment.getCommentsByPostId(postId);
    res.render("detail-page", {
      user: { id: userId, islikedPost },
      post,
      comments
    });
  },

  getUpdatePage: async (req, res) => {
    const userId = req.user;
    const postId = req.params.postId;
    const post = await Post.getPostByPostId(postId);
    const text = post.text;
    res.render("post-update", {
      user: { id: userId },
      text
    });
  },

  updatePost: async (req, res) => {
    const postId = req.params.postId;
    const updateText = req.body.updateText;
    await Post.updatePost(postId, updateText);
    return res.json("success");
  },

  deletePost: async (req, res) => {
    const postId = req.params.postId;
    await Post.deletePost(postId);
    return res.json("success");
  },

  updateLike: async (req, res) => {
    const userId = req.user;
    const postId = req.params.postId;
    const islikedPost = await User.findLikedPost(userId, postId);
    if (islikedPost) {
      const unLikedPost = await Post.unLikePost(postId);
      await User.removeLikedPostId(userId, unLikedPost._id);
      const updateResult = {
        updatedStatus: "unliked",
        likesCount: unLikedPost.likes
      };
      return res.json(updateResult);
    }
    const likedPost = await Post.likePost(postId);
    await User.addLikedPostId(userId, likedPost._id);
    const updateResult = {
      updatedStatus: "liked",
      likesCount: likedPost.likes
    };
    return res.json(updateResult);
  }
};

module.exports = detailController;
