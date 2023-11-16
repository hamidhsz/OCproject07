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
    usersLiked: {
      type: DataTypes.TEXT,
      get: function() {
        const rawValue = this.getDataValue('usersLiked');
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set: function(val) {
        this.setDataValue('usersLiked', JSON.stringify(val));
      }
    },
    usersDisliked: {
      type: DataTypes.TEXT,
      get: function() {
        const rawValue = this.getDataValue('usersDisliked');
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set: function(val) {
        this.setDataValue('usersDisliked', JSON.stringify(val));
      }
    },
  });

  Post.associate = function (models) {
    Post.belongsTo(models.User);
  };

  return Post;
};