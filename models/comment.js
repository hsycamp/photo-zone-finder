const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: String,
  content: String,
  publishedDate: { type: Date, default: Date.now },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  display: { type: Boolean, default: true }
});

commentSchema.statics.createComment = async function(commentData) {
  const { text, postId, userObjectId } = commentData;
  const newComment = await this.create({
    postId,
    content: text,
    publisher: userObjectId
  });
  return newComment;
};

commentSchema.statics.getCommentsByPostId = async function(postId) {
  const comments = await this.find({ postId, display: true }).populate({
    path: "publisher",
    select: "userName"
  });
  return comments;
};

commentSchema.statics.deleteComment = async function(commentId) {
  await this.updateOne({ _id: commentId }, { display: false });
};

module.exports = mongoose.model("Comment", commentSchema);
