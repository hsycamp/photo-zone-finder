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

  Comment.createComment = async function(commentData) {
    const { text, postId, userObjectId } = commentData;
    const newComment = await this.create({
      postId,
      text,
      publisherId: userObjectId
    });
    return newComment;
  };

  Comment.deleteComment = async function(commentId) {
    await this.destroy({
      where: { id: commentId }
    });
  };

  return Comment;
};
