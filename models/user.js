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

userSchema.statics.getUserData = async function(userName) {
  const userData = await this.findOne({ userName }).populate({
    path: "posts",
    match: { display: true }
  });
  return userData;
};

userSchema.statics.addPostId = async function(userObjectId, postId) {
  const updatedUser = await this.findOneAndUpdate(
    { _id: userObjectId },
    { $push: { posts: { $each: [postId], $position: 0 } } },
    { new: true }
  );
  return updatedUser;
};

userSchema.statics.checkLikedPost = async function(userObjectId, postId) {
  const user = await this.findOne({ _id: userObjectId, likePosts: postId });
  if (user) {
    return true;
  }
  return false;
};

userSchema.statics.addLikedPostId = async function(userObjectId, postId) {
  const updatedUser = await this.findOneAndUpdate(
    { _id: userObjectId },
    { $push: { likePosts: { $each: [postId], $position: 0 } } },
    { new: true }
  );
  return updatedUser;
};

userSchema.statics.removeLikedPostId = async function(userObjectId, postId) {
  const updatedUser = await this.findOneAndUpdate(
    { _id: userObjectId },
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
