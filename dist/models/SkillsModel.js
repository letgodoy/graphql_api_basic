"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Skills = sequelize.define('Skills', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
    }, {
        tableName: 'Skillses'
    });
    Skills.associate = (models) => {
        Skills.belongsTo(models.Category, {
            foreignKey: {
                allowNull: false,
                field: 'category',
                name: 'category'
            }
        });
        Skills.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    };
    return Skills;
};
