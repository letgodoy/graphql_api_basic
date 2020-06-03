const bcryptjs = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ['USER', 'ADMIND', 'ADMINA'],
        allowNull: false,
        defaultValue: 'USER',
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
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeCreate: (user) => {
          const salt = bcryptjs.genSaltSync()
          user.password = bcryptjs.hashSync(user.password, salt)
        },
        beforeUpdate: (user) => {
          if (user.changed('password')) {
            const salt = bcryptjs.genSaltSync()
            user.password = bcryptjs.hashSync(user.password, salt)
          }
        },
      },
    }
  )
  User.associate = (models) => {
    // User.belongsTo(models.Player, {
    //   foreignKey: {
    //     allowNull: true,
    //     field: 'id',
    //     name: 'player',
    //   },
    // })
    // User.hasOne(models.Address, { as: 'address' }),
    //   User.hasOne(models.File, { as: 'photo' }),
    //   User.hasMany(models.Chat, { as: 'chatsFrom' }),
    //   User.hasMany(models.Chat, { as: 'chatsTo' }),
    //   User.hasMany(models.Comment, { as: 'commentsTo' }),
    //   User.hasMany(models.Comment, { as: 'commentsfrom' }),
    //   User.hasMany(models.Notification, { as: 'notifications' }),
    //   User.hasMany(models.Propose, { as: 'proposes' }),
    //   User.hasMany(models.Propose, { as: 'proposesFrom' }),
    //   User.hasMany(models.Rank, { as: 'ranks' }),
    //   User.hasMany(models.Rank, { as: 'ranksmaked' }),
    //   User.hasMany(models.Anuncio, { as: 'anuncioses' })
  }
  User.prototype.isPassword = (encodedPassword, password) => {
    return bcryptjs.compareSync(password, encodedPassword)
  }
  return User
}
