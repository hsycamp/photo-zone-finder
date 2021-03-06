const db = require("../mysql-models");
const bcrypt = require("bcrypt");
const generateJwt = require("../util/jwt-token-generator");

const userController = {
  signUp: async (req, res, next) => {
    const { userId, userName, password, authProvider } = req.body;
    const isDuplicateUserId = await db.User.checkDuplicateUserId(
      userId,
      authProvider
    );
    const isDuplicateUserName = await db.User.checkDuplicateUserName(userName);
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
    const user = await db.User.createUser(signUpData);
    const userInfo = { _id: user.id, userName: user.userName };
    await generateJwt(res, userInfo);

    return res.redirect("/sign-in");
  },

  checkDuplicateUserName: async (req, res, next) => {
    const userName = req.params.userName;
    const isDuplicateUserName = await db.User.checkDuplicateUserName(userName);
    if (isDuplicateUserName) {
      return res.send("duplicate");
    }
    return res.send("unique");
  },

  addFollow: async (req, res, next) => {
    const userObjectId = req.user._id;
    const followingUserName = req.params.userName;
    const user = await db.User.findOne({ where: { id: userObjectId } });
    const targetUser = await db.User.findOne({
      where: { userName: followingUserName }
    });
    await user.addFollowing(targetUser.id);
    const followers = await targetUser.getFollowers({
      attributes: ["userName"]
    });
    const updateResult = {
      updatedStatus: "followed",
      followersCount: followers.length
    };

    return res.json(updateResult);
  },

  removeFollow: async (req, res, next) => {
    const userObjectId = req.user._id;
    const followingUserName = req.params.userName;
    const user = await db.User.findOne({ where: { id: userObjectId } });
    const targetUser = await db.User.findOne({
      where: { userName: followingUserName }
    });
    await user.removeFollowing(targetUser.id);
    const followers = await targetUser.getFollowers({
      attributes: ["userName"]
    });
    const updateResult = {
      updatedStatus: "unfollowed",
      followersCount: followers.length
    };

    return res.json(updateResult);
  },

  getFollowers: async (req, res, next) => {
    const targetUserName = req.params.userName;
    const targetUser = await db.User.findOne({
      attributes: [],
      where: { userName: targetUserName },
      include: [
        {
          model: db.User,
          as: "followers",
          attributes: ["userName"],
          include: [
            {
              model: db.User,
              as: "followers",
              attributes: ["userName"],
              where: { id: req.user._id },
              required: false
            }
          ]
        }
      ]
    });
    return res.json(targetUser.followers);
  },

  getFollowings: async (req, res, next) => {
    const targetUserName = req.params.userName;
    const targetUser = await db.User.findOne({
      attributes: [],
      where: { userName: targetUserName },
      include: [
        {
          model: db.User,
          as: "followings",
          attributes: ["userName"],
          include: [
            {
              model: db.User,
              as: "followers",
              attributes: ["userName"],
              where: { id: req.user._id },
              required: false
            }
          ]
        }
      ]
    });
    return res.json(targetUser.followings);
  }
};

module.exports = userController;
