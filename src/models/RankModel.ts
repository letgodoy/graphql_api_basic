import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface RankAttributes {
    id?: string;
    media?: number;
    agilidade?: number;
    atendimento?: number;
    custo?: number;
    custoC?: number;
    ferramentas?: number;
    pontualidade?: number;
    pontualidadeC?: number;
    respeitoC?: number;
    resposta?: number;
    solucao?: number;
    transparenciaC?: number;
    typeTo?: string;

    from?: string;
    propose?: string;
    player?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface RankInstance extends Sequelize.Instance<RankAttributes> {}

export interface RankModel extends BaseModelInterface, Sequelize.Model<RankInstance, RankAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): RankModel => {

    const Rank: RankModel = sequelize.define('Rank', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        media: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        agilidade: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        atendimento: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        custo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        custoC: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        ferramentas: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        pontualidade: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        pontualidadeC: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        respeitoC: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        resposta: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        solucao: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        transparenciaC: {
            type: DataTypes.INTEGER,
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

    Rank.associate = (models: ModelsInterface): void => {

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