const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: String,
  password: String
});

userSchema.pre("save", async function(next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.methods.checkPassword = async function(inputPassword) {
  const checkResult = await bcrypt.compare(this.password, inputPassword);
  return checkResult;
};

module.exports = mongoose.model("users", userSchema);
