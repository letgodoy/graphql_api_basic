import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface HabilidadeAttributes {
    id?: string;
    name?: string;
    cadastro?: boolean;

    player?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface HabilidadeInstance extends Sequelize.Instance<HabilidadeAttributes> {}

export interface HabilidadeModel extends BaseModelInterface, Sequelize.Model<HabilidadeInstance, HabilidadeAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): HabilidadeModel => {

    const Habilidade: HabilidadeModel = sequelize.define('Habilidade', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        cadastro: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        tableName: 'Habilidades'
    });

    Habilidade.associate = (models: ModelsInterface): void => {

        Habilidade.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'player',
                name: 'player'
            }
        });

    };

    return Habilidade;

};