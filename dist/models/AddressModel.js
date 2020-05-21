"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        city: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        complement: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
        country: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: "Brasil"
        },
        neighborhood: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
        number: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
        state: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        street: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
        zipcode: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        tableName: 'addresses'
    });
    Address.associate = (models) => {
        Address.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'player',
                name: 'player'
            }
        });
    };
    return Address;
};
