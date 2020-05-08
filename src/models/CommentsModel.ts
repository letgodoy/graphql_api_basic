import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface CommentAttributes {
    id?: string;
    description?: string;
    date?: string;
    reply?: string;
    typeTo?: string;
    rating?: string;

    from?: string;
    propose?: string;
    to?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface CommentInstance extends Sequelize.Instance<CommentAttributes> {}

export interface CommentModel extends BaseModelInterface, Sequelize.Model<CommentInstance, CommentAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CommentModel => {

    const Comment: CommentModel = sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        reply: {
            type: DataTypes.STRING(128),
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
        tableName: 'Comments'
    });

    Comment.associate = (models: ModelsInterface): void => {

        Comment.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'from',
                name: 'from'
            }
        });

        Comment.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'to',
                name: 'to'
            }
        });

        Comment.belongsTo(models.Propose, {
            foreignKey: {
                allowNull: false,
                field: 'propose',
                name: 'propose'
            }
        });

    };

    return Comment;

};