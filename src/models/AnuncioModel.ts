import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface AnuncioAttributes {
    id?: string;
    description?: string;
    active?: boolean;
    price?: string;

    player?: string;
    skills?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface AnuncioInstance extends Sequelize.Instance<AnuncioAttributes> {}

export interface AnuncioModel extends BaseModelInterface, Sequelize.Model<AnuncioInstance, AnuncioAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): AnuncioModel => {

    const Anuncio: AnuncioModel = sequelize.define('Anuncio', {
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

    Anuncio.associate = (models: ModelsInterface): void => {

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