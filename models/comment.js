const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: String,
  content: String,
  publishedDate: { type: Date, default: Date.now },
  publisher: String,
  display: { type: Boolean, default: true }
});

module.exports = mongoose.model("Comment", commentSchema);
