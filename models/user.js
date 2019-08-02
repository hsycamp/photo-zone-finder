const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  password: String
});

userSchema.methods.checkPassword = function(inputPassword) {
  return inputPassword === this.password;
};

module.exports = mongoose.model("users", userSchema);
