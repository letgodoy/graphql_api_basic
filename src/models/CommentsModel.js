module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
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
      reply: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null,
      },
      typeTo: {
        type: DataTypes.ENUM,
        values: ['PROFISSIONAL', 'CLIENTE'],
        allowNull: false,
        defaultValue: 'CLIENTE',
      },
      date: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      rating: {
        type: DataTypes.ENUM,
        values: ['POSITIVE', 'NEUTRAL', 'NEGATIVE'],
        allowNull: false,
        defaultValue: 'NEUTRAL',
      },
    },
    {
      tableName: 'Comments',
    }
  )
  Comment.associate = (models) => {
    Comment.belongsTo(models.Player, {
      foreignKey: {
        allowNull: false,
        field: 'from',
        name: 'from',
      },
    })
    Comment.belongsTo(models.Player, {
      foreignKey: {
        allowNull: false,
        field: 'to',
        name: 'to',
      },
    })
    Comment.belongsTo(models.Propose, {
      foreignKey: {
        allowNull: false,
        field: 'propose',
        name: 'propose',
      },
    })
  }
  return Comment
}
