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

  return Comment;
};
