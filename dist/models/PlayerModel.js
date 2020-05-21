"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        document: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ["PROFISSIONAL", "CLIENTE"],
            allowNull: false,
            defaultValue: "CLIENTE"
        },
        phoneverif: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        tableName: 'Players'
    });
    Player.associate = (models) => {
        Player.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    };
    return Player;
};
