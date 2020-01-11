"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      content: {
        type: DataTypes.STRING(300),
        allowNull: false
      },
      text: {
        type: DataTypes.TEXT
      },
      likes: {
        allowNull: false,
        type: DataTypes.INTEGER(5),
        defaultValue: "0"
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
    { paranoid: true, tableName: "post" }
  );

  return Post;
};
