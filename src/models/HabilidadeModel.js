module.exports = (sequelize, DataTypes) => {
  const Habilidade = sequelize.define(
    'Habilidade',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      cadastro: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'Habilidades',
      timestamps: true,
    }
  )
  Habilidade.associate = (models) => {
    Habilidade.belongsTo(models.Player, {
      foreignKey: {
        allowNull: false,
        field: 'player',
        name: 'player',
      },
    })
  }
  return Habilidade
}
