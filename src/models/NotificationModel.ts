import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface NotificationAttributes {
    id?: string;
    description?: string;
    link?: string;
    status?: boolean;
    title?: string;
    date?: string;

    player?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface NotificationInstance extends Sequelize.Instance<NotificationAttributes> {}

export interface NotificationModel extends BaseModelInterface, Sequelize.Model<NotificationInstance, NotificationAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): NotificationModel => {

    const Notification: NotificationModel = sequelize.define('Notification', {
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
        link: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        date: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        tableName: 'notifications'
    });

    Notification.associate = (models: ModelsInterface): void => {

        Notification.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'player',
                name: 'player'
            }
        });

    };

    return Notification;

};