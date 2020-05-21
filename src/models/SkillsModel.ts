import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface SkillsAttributes {
    id?: string;
    name?: string;

    category?: string;
    user?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface SkillsInstance extends Sequelize.Instance<SkillsAttributes> {}

export interface SkillsModel extends BaseModelInterface, Sequelize.Model<SkillsInstance, SkillsAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): SkillsModel => {

    const Skills: SkillsModel = sequelize.define('Skills', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
    }, {
        tableName: 'Skillses'
    });

    Skills.associate = (models: ModelsInterface): void => {

        Skills.belongsTo(models.Category, {
            foreignKey: {
                allowNull: false,
                field: 'category',
                name: 'category'
            }
        });

        Skills.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });

    };

    return Skills;

};