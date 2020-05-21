"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Rank = sequelize.define('Rank', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        media: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        agilidade: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        atendimento: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        custo: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        custoC: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        ferramentas: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        pontualidade: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        pontualidadeC: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        respeitoC: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        resposta: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        solucao: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        transparenciaC: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: null
        },
        typeTo: {
            type: DataTypes.ENUM,
            values: ["PROFISSIONAL", "CLIENTE"],
            allowNull: false,
            defaultValue: "CLIENTE"
        },
        date: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        rating: {
            type: DataTypes.ENUM,
            values: ["POSITIVE", "NEUTRAL", "NEGATIVE"],
            allowNull: false,
            defaultValue: "NEUTRAL"
        }
    }, {
        tableName: 'Ranks'
    });
    Rank.associate = (models) => {
        Rank.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'from',
                name: 'from'
            }
        });
        Rank.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'player',
                name: 'player'
            }
        });
        Rank.belongsTo(models.Propose, {
            foreignKey: {
                allowNull: false,
                field: 'propose',
                name: 'propose'
            }
        });
    };
    return Rank;
};
