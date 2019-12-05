const User = require("../models/user");
const bcrypt = require("bcrypt");

const userController = {
  signUp: async (req, res, next) => {
    const { id, password } = req.body;
    const existId = await User.findUser(id);
    if (existId) {
      req.flash("message", "이미 존재하는 아이디입니다.");
      return res.redirect("/sign-up");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser(id, hashedPassword);
    return res.redirect("/sign-in");
  }
};

module.exports = userController;
