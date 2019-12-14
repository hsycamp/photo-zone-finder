const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: String,
  text: String,
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  publishedDate: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  display: { type: Boolean, default: true }
});

postSchema.statics.createPost = async function(postData) {
  const { content, text, userObjectId } = postData;
  const newPost = await this.create({
    content,
    text,
    publisher: userObjectId
  });
  return newPost;
};

postSchema.statics.getAllPosts = async function() {
  const allPosts = await this.find({ display: true }).sort({
    publishedDate: -1
  });
  return allPosts;
};

postSchema.statics.getPostByPostId = async function(postId) {
  const post = await this.findById(postId).populate({
    path: "publisher",
    select: "userName"
  });
  return post;
};

postSchema.statics.updatePost = async function(postId, updateText) {
  await this.updateOne({ _id: postId }, { text: updateText });
};

postSchema.statics.deletePost = async function(postId) {
  await this.updateOne({ _id: postId }, { display: false });
};

postSchema.statics.likePost = async function(postId) {
  const likedPost = await this.findOneAndUpdate(
    { _id: postId },
    { $inc: { likes: 1 } },
    { new: true }
  );
  return likedPost;
};

postSchema.statics.unLikePost = async function(postId) {
  const likedPost = await this.findOneAndUpdate(
    { _id: postId },
    { $inc: { likes: -1 } },
    { new: true }
  );
  return likedPost;
};

module.exports = mongoose.model("Post", postSchema);
