import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface NewsAttributes {
    id?: string;
    name?: string;
    logo?: string;
    link?: string;

    user?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface NewsInstance extends Sequelize.Instance<NewsAttributes> {}

export interface NewsModel extends BaseModelInterface, Sequelize.Model<NewsInstance, NewsAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): NewsModel => {

    const News: NewsModel = sequelize.define('News', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'Newses'
    });

    News.associate = (models: ModelsInterface): void => {

        News.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });

    };

    return News;

};