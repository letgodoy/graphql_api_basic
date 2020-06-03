module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      complement: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null,
      },
      country: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: 'Brasil',
      },
      neighborhood: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null,
      },
      number: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null,
      },
      state: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null,
      },
      zipcode: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'addresses',
      timestamps: true,
    }
  )
  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user',
      },
    })
  }

  return Address
}
