"use strict";

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      userName: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      authProvider: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    },
    { paranoid: true, tableName: "user" }
  );

  User.associate = function(db) {
    User.hasMany(db.Post, {
      foreignKey: { name: "publisherId", allowNull: false }
    });
    User.hasMany(db.Comment, {
      foreignKey: { name: "publisherId", allowNull: false }
    });
    User.belongsToMany(db.Post, {
      through: "likePost",
      foreignKey: { name: "userId", allowNull: false }
    });
    User.belongsToMany(User, {
      as: "followers",
      through: "follow",
      foreignKey: { name: "followingId", allowNull: false }
    });
    User.belongsToMany(User, {
      as: "followings",
      through: "follow",
      foreignKey: { name: "followerId", allowNull: false }
    });
  };

  User.createUser = async function(signUpData) {
    const { userId, userName, password, authProvider } = signUpData;
    const newUser = await this.create({
      userId,
      userName,
      password,
      authProvider
    });
    return newUser;
  };

  User.findUser = async function(userId, authProvider) {
    const user = await this.findOne({ where: { userId, authProvider } });
    return user;
  };

  User.checkDuplicateUserId = async function(userId, authProvider) {
    return await this.findOne({ where: { userId, authProvider } });
  };

  User.checkDuplicateUserName = async function(userName) {
    return await this.findOne({ where: { userName } });
  };

  User.getUserData = async function(userName, models) {
    const userData = await this.findOne({
      where: { userName }
    });
    return userData;
  };

  User.prototype.checkPassword = async function(inputPassword) {
    const isValidPassword = await bcrypt.compare(inputPassword, this.password);
    return isValidPassword;
  };

  return User;
};
