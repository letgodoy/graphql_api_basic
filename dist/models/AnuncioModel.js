"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Anuncio = sequelize.define('Anuncio', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        price: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: "á combinar"
        },
    }, {
        tableName: 'Anuncios'
    });
    Anuncio.associate = (models) => {
        Anuncio.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'player',
                name: 'player'
            }
        });
        Anuncio.belongsTo(models.Skills, {
            foreignKey: {
                allowNull: false,
                field: 'skills',
                name: 'skills'
            }
        });
    };
    return Anuncio;
};
