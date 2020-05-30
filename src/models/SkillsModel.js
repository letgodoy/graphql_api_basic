module.exports = (sequelize, DataTypes) => {
  const Skills = sequelize.define(
    'Skills',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: 'Skillses',
    }
  )
  Skills.associate = (models) => {
    Skills.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
        field: 'category',
        name: 'category',
      },
    })
    Skills.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user',
      },
    })
  }
  return Skills
}