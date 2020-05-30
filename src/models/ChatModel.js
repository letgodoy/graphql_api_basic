module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      date: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'chats',
    }
  )
  Chat.associate = (models) => {
    Chat.belongsTo(models.Player, {
      foreignKey: {
        allowNull: false,
        field: 'from',
        name: 'from',
      },
    })
    Chat.belongsTo(models.Player, {
      foreignKey: {
        allowNull: false,
        field: 'to',
        name: 'to',
      },
    })
    Chat.belongsTo(models.Propose, {
      foreignKey: {
        allowNull: false,
        field: 'propose',
        name: 'propose',
      },
    })
  }
  return Chat
}
