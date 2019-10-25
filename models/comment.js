const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  publishedDate: { type: Date, default: Date.now },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Comment", commentSchema);
