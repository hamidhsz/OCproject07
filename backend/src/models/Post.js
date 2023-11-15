module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    usersLiked: DataTypes.ARRAY(DataTypes.STRING), 
    usersDisliked: DataTypes.ARRAY(DataTypes.STRING),
  });
  Post.associate = function (models) {
    console.log(models);
    Post.belongsTo(models.User);
  };
  return Post;
};