module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
    'News',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Newses',
      timestamps: true,
    }
  )
  News.associate = (models) => {
    News.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user',
      },
    })
  }
  return News
}
