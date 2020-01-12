"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      text: {
        allowNull: false,
        type: DataTypes.STRING(300)
      }
    },
    { paranoid: true, tableName: "comment" }
  );
  Comment.associate = function(db) {
    Comment.belongsTo(db.Post, { foreignKey: "postId" });
    Comment.belongsTo(db.User, { foreignKey: "publisherId" });
  };

  return Comment;
};
