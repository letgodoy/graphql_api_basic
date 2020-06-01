module.exports = (sequelize, DataTypes) => {
  const Anuncio = sequelize.define(
    'Anuncio',
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
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      price: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: 'á combinar',
      },
    },
    {
      tableName: 'Anuncios',
      timestamps: true,
    }
  )
  Anuncio.associate = (models) => {
    Anuncio.belongsTo(models.Player, {
      foreignKey: {
        allowNull: false,
        field: 'player',
        name: 'player',
      },
    })
    Anuncio.belongsTo(models.Skills, {
      foreignKey: {
        allowNull: false,
        field: 'skills',
        name: 'skills',
      },
    })
    Anuncio.belongsTo(models.File, {
      foreignKey: {
        allowNull: true,
        field: 'files',
        name: 'files',
      },
    })
  }
  return Anuncio
}
