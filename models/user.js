const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: String,
  password: String,
  auth: {
    googleId: String
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
});

userSchema.statics.createUser = async function(id, password) {
  const newUser = await this.create({ id, password });
  return newUser;
};

userSchema.statics.findUser = async function(userId) {
  const user = await this.findOne({ id: userId });
  return user;
};

userSchema.statics.getUserData = async function(userId) {
  const userData = await this.findOne({ id: userId }).populate({
    path: "posts",
    match: { display: true }
  });
  return userData;
};

userSchema.statics.addPostId = async function(userId, postId) {
  const updatedUser = await this.findOneAndUpdate(
    { id: userId },
    { $push: { posts: { $each: [postId], $position: 0 } } },
    { new: true }
  );
  return updatedUser;
};

userSchema.methods.checkPassword = async function(inputPassword) {
  const checkResult = await bcrypt.compare(inputPassword, this.password);
  return checkResult;
};

module.exports = mongoose.model("User", userSchema);
