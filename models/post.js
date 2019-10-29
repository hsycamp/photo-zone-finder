const mongoose = require("mongoose");
const UserSchema = require("./user");
const commentSchema = require("./comment").schema

const postSchema = new mongoose.Schema({
  content: String,
  text:String,
  publisher: UserSchema,
  publishedDate: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [commentSchema]
});

module.exports = mongoose.model("Post", postSchema);
