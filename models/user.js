const mongoose = require("mongoose");
const postSchema = require("./post").schema;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: String,
  password: String,
  auth: {
    googleId: String
  },
  posts: [postSchema]
});

userSchema.pre("save", async function(next) {
  if (this.auth.googleId) {
    next();
  }
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.methods.checkPassword = async function(inputPassword) {
  const checkResult = await bcrypt.compare(inputPassword, this.password);
  return checkResult;
};

module.exports = mongoose.model("users", userSchema);
