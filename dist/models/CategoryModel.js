"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
    }, {
        tableName: 'categories'
    });
    Category.associate = (models) => {
        Category.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    };
    return Category;
};
