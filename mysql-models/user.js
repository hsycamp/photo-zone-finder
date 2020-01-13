"use strict";
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
      foreignKey: { name: "followerId", allowNull: false }
    });
    User.belongsToMany(User, {
      as: "followings",
      through: "follow",
      foreignKey: { name: "followingId", allowNull: false }
    });
  };

  return User;
};
