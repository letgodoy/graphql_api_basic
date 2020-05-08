import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface ChatAttributes {
    id?: string;
    description?: string;
    status?: boolean;
    date?: string;

    from?: string;
    propose?: string;
    to?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface ChatInstance extends Sequelize.Instance<ChatAttributes> {}

export interface ChatModel extends BaseModelInterface, Sequelize.Model<ChatInstance, ChatAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ChatModel => {

    const Chat: ChatModel = sequelize.define('Chat', {
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
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        date: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    }, {
        tableName: 'chats'
    });

    Chat.associate = (models: ModelsInterface): void => {

        Chat.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'from',
                name: 'from'
            }
        });

        Chat.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'to',
                name: 'to'
            }
        });

        Chat.belongsTo(models.Propose, {
            foreignKey: {
                allowNull: false,
                field: 'propose',
                name: 'propose'
            }
        });

    };

    return Chat;

};