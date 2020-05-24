"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Propose = sequelize.define('Propose', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateEnd: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        dateEndF: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        dateInit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateInitF: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        skill: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timeEnd: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        timeEndF: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        timeInit: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        timeInitF: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        valueEnd: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        valueInit: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        aceite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        locationF: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
    }, {
        tableName: 'Proposes'
    });
    Propose.associate = (models) => {
        Propose.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'from',
                name: 'from'
            }
        });
        Propose.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'to',
                name: 'to'
            }
        });
        Propose.belongsTo(models.Anuncio, {
            foreignKey: {
                allowNull: false,
                field: 'anuncio',
                name: 'anuncio'
            }
        });
    };
    return Propose;
};
