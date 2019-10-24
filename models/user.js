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

userSchema.methods.checkPassword = async function(inputPassword) {
  const checkResult = await bcrypt.compare(inputPassword, this.password);
  return checkResult;
};

module.exports = mongoose.model("users", userSchema);
