const mongoose = require("mongoose");
const UserSchema = require("./user");

const postSchema = mongoose.Schema({
  content: String,
  publisher: UserSchema,
  publishedDate: { type: Date, default: Date.now },
  likes: Number,
  comments: String
});

module.exports = mongoose.model("post", postSchema);