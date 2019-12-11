const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  password: String,
  authProvider: { type: String, default: "local" },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  likePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
});

userSchema.statics.createUser = async function(signUpData) {
  const { userId, userName, password, authProvider } = signUpData;
  const newUser = await this.create({
    userId,
    userName,
    password,
    authProvider
  });
  return newUser;
};

userSchema.statics.findUser = async function(userId, authProvider) {
  const user = await this.findOne({ userId, authProvider });
  return user;
};
userSchema.statics.checkDuplicateUserId = async function(userId, authProvider) {
  const user = await this.findOne({ userId, authProvider });
  if (user) {
    return true;
  }
  return false;
};

userSchema.statics.checkDuplicateUserName = async function(userName) {
  const user = await this.findOne({ userName });
  if (user) {
    return true;
  }
  return false;
};

userSchema.statics.getUserData = async function(userId) {
  const userData = await this.findOne({ userId }).populate({
    path: "posts",
    match: { display: true }
  });
  return userData;
};

userSchema.statics.addPostId = async function(userId, postId) {
  const updatedUser = await this.findOneAndUpdate(
    { userId },
    { $push: { posts: { $each: [postId], $position: 0 } } },
    { new: true }
  );
  return updatedUser;
};

userSchema.statics.findLikedPost = async function(userId, postId) {
  const user = await this.findOne({ userId, likePosts: postId });
  return user;
};

userSchema.statics.addLikedPostId = async function(userId, postId) {
  const updatedUser = await this.findOneAndUpdate(
    { userId },
    { $push: { likePosts: { $each: [postId], $position: 0 } } },
    { new: true }
  );
  return updatedUser;
};

userSchema.statics.removeLikedPostId = async function(userId, postId) {
  const updatedUser = await this.findOneAndUpdate(
    { userId },
    { $pull: { likePosts: postId } },
    { new: true }
  );
  return updatedUser;
};

userSchema.methods.checkPassword = async function(inputPassword) {
  const checkResult = await bcrypt.compare(inputPassword, this.password);
  return checkResult;
};

module.exports = mongoose.model("User", userSchema);
