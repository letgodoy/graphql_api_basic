module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define(
    'Player',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['PROFISSIONAL', 'CLIENTE'],
        allowNull: false,
        defaultValue: 'CLIENTE',
      },
      phoneverif: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'Players',
      timestamps: true,
    }
  )
  Player.associate = (models) => {
    Player.belongsTo(models.File, {
      foreignKey: {
        allowNull: true,
        field: 'photo',
        name: 'photo',
      },
    }),
    
      Player.hasOne(models.User, {
        foreignKey: {
          allowNull: true,
          field: 'user',
          name: 'user',
        },
      })
  }
  return Player
}
