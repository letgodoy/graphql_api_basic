module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'categories',
    }
  )
  Category.associate = (models) => {
    Category.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user',
      },
    })
    Category.belongsTo(models.File, {
      foreignKey: {
        allowNull: true,
        field: 'file',
        name: 'file',
      },
    })
  }
  return Category
}
