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
      }
    },
    { paranoid: true, tableName: "post" }
  );

  Post.associate = function(db) {
    Post.belongsTo(db.User, { foreignKey: "publisherId" });
    Post.hasMany(db.Comment, {
      foreignKey: { name: "postId", allowNull: false }
    });
    Post.belongsToMany(db.User, {
      through: "likePost",
      foreignKey: { name: "postId", allowNull: false }
    });
  };

  return Post;
};
