module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: 'posts',
    }
  )
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user',
      },
    })
    Post.belongsTo(models.File, {
      foreignKey: {
        allowNull: true,
        field: 'file',
        name: 'file',
      },
    })
    Post.belongsTo(models.File, {
      foreignKey: {
        allowNull: true,
        field: 'thumbnail',
        name: 'thumbnail',
      },
    })
  }
  return Post
}
