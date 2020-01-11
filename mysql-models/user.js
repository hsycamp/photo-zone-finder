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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    { paranoid: true, tableName: "user" }
  );

  return User;
};
