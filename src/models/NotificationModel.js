module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
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
      link: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'notifications',
      timestamps: true,
    }
  )
  Notification.associate = (models) => {
    Notification.belongsTo(models.Player, {
      foreignKey: {
        allowNull: false,
        field: 'player',
        name: 'player',
      },
    })
  }
  return Notification
}
