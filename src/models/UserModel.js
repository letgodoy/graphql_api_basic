const bcryptjs = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      // id: {
      //     type: DataTypes.UUID,
      //     defaultValue: DataTypes.UUIDV1,
      //     allowNull: false,
      //     primaryKey: true
      // },
      id: {
        type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
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
    },
    {
      tableName: 'users',
      hooks: {
        beforeCreate: (user, options) => {
          const salt = bcryptjs.genSaltSync()
          user.password = bcryptjs.hashSync(user.password, salt)
        },
        beforeUpdate: (user, options) => {
          if (user.changed('password')) {
            const salt = bcryptjs.genSaltSync()
            user.password = bcryptjs.hashSync(user.password, salt)
          }
        },
      },
    }
  )
  User.associate = (models) => {
    User.belongsTo(models.Player, {
      foreignKey: {
        allowNull: true,
        field: 'player',
        name: 'player',
      },
    })
  }
  User.prototype.isPassword = (encodedPassword, password) => {
    return bcryptjs.compareSync(password, encodedPassword)
  }
  return User
}
