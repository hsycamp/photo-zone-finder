const User = require("../models/user");
const bcrypt = require("bcrypt");

const userController = {
  signUp: async (req, res, next) => {
    const { userId, userName, password, authProvider } = req.body;
    const isDuplicateUserId = await User.checkDuplicateUserId(
      userId,
      authProvider
    );
    const isDuplicateUserName = await User.checkDuplicateUserName(userName);
    if (isDuplicateUserId) {
      req.flash("message", "이미 존재하는 아이디입니다.");
      return res.redirect("/sign-up");
    }
    if (isDuplicateUserName) {
      req.flash("message", "이미 존재하는 이름입니다.");
      return res.redirect("/sign-up");
    }
    const hashedPassword = password ? await bcrypt.hash(password, 10) : "";
    const signUpData = {
      userId,
      userName,
      password: hashedPassword,
      authProvider
    };
    const user = await User.createUser(signUpData);
    return res.redirect("/sign-in");
  },

  checkDuplicateUserName: async (req, res, next) => {
    const userName = req.params.userName;
    const isDuplicateUserName = await User.checkDuplicateUserName(userName);
    if (isDuplicateUserName) {
      return res.send("duplicate");
    }
    return res.send("unique");
  }
};

module.exports = userController;
