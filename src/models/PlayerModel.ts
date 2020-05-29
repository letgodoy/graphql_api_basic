import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface PlayerAttributes {
    id?: string;
    avatar?: string;
    birthday?: string;
    description?: string;
    document?: string;
    email?: string;
    name?: string;
    phone?: string;
    status?: boolean;
    type?: string;
    phoneverif?: boolean;
    photo?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface PlayerInstance extends Sequelize.Instance<PlayerAttributes> {}

export interface PlayerModel extends BaseModelInterface, Sequelize.Model<PlayerInstance, PlayerAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PlayerModel => {

    const Player: PlayerModel = sequelize.define('Player', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        document: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ["PROFISSIONAL", "CLIENTE"],
            allowNull: false,
            defaultValue: "CLIENTE"
        },
        phoneverif: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        tableName: 'Players'
    });

    Player.associate = (models: ModelsInterface): void => {

        Player.belongsTo(models.File, {
            foreignKey: {
                allowNull: true,
                field: 'photo',
                name: 'photo'
            }
        });

    };

    return Player;

};