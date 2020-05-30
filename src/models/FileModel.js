module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define(
    'File',
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
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Files',
    }
  )
  // File.associate = (models: ModelsInterface): void => {
  //     File.belongsTo(models.User, {
  //         foreignKey: {
  //             allowNull: false,
  //             field: 'user',
  //             name: 'user'
  //         }
  //     });
  // };
  return File
}
