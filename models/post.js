const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: String,
  text: String,
  publisher: String,
  publishedDate: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model("Post", postSchema);
