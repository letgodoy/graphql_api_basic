import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface CategoryAttributes {
    id?: string;
    description?: string;
    name?: string;
    image?: string;

    user?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CategoryInstance extends Sequelize.Instance<CategoryAttributes> {}

export interface CategoryModel extends BaseModelInterface, Sequelize.Model<CategoryInstance, CategoryAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CategoryModel => {

    const Category: CategoryModel = sequelize.define('Category', {
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

    Category.associate = (models: ModelsInterface): void => {

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