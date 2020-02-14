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
      as: "liker",
      foreignKey: { name: "postId", allowNull: false }
    });
  };

  Post.createPost = async function(postData) {
    const { content, text, userObjectId } = postData;
    const newPost = await this.create({
      content,
      text,
      publisherId: userObjectId
    });
    return newPost;
  };

  Post.getAllPosts = async function() {
    const allPosts = await this.findAll({
      raw: true,
      order: [["createdAt", "DESC"]]
    });
    return allPosts;
  };

  Post.getPostWithCommentsByPostId = async function(postId, db) {
    const post = await this.findAll({
      raw: true,
      where: { id: postId },
      include: [
        { model: db.User, attributes: ["id", "userName"] },
        {
          model: db.Comment,
          attributes: ["id", "text", "createdAt"],
          include: [{ model: db.User, attributes: ["userName"] }]
        }
      ]
    });
    return post;
  };

  Post.getPostByPostId = async function(postId) {
    const post = await this.findOne({
      where: { id: postId }
    });
    return post;
  };

  Post.updatePost = async function(postId, updateText) {
    await this.update(
      { text: updateText },
      {
        where: { id: postId }
      }
    );
  };

  Post.deletePost = async function(postId) {
    await this.destroy({
      where: { id: postId }
    });
  };

  Post.getLikers = async function(postId, userObjectId, db) {
    const post = await this.findOne({
      attributes: [],
      where: { id: postId },
      include: [
        {
          model: db.User,
          as: "liker",
          attributes: ["userName"],
          include: [
            {
              model: db.User,
              as: "followers",
              attributes: ["userName"],
              where: { id: userObjectId },
              required: false
            }
          ]
        }
      ]
    });
    return post.liker;
  };

  return Post;
};
