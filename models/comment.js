const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  publishedDate: { type: Date, default: Date.now },
  publisher: String
});

module.exports = mongoose.model("Comment", commentSchema);
