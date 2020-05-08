import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface AddressAttributes {
    id?: string;
    city?: string;
    complement?: string;
    country?: string;
    neighborhood?: string;
    number?: string;
    state?: string;
    street?: string;
    zipcode?: string;

    player?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface AddressInstance extends Sequelize.Instance<AddressAttributes> {}

export interface AddressModel extends BaseModelInterface, Sequelize.Model<AddressInstance, AddressAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): AddressModel => {

    const Address: AddressModel = sequelize.define('Address', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        city: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        complement: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
        country: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: "Brasil"
        },
        neighborhood: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
        number: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
        state: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        street: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
        },
        zipcode: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        tableName: 'addresses'
    });

    Address.associate = (models: ModelsInterface): void => {

        Address.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false,
                field: 'player',
                name: 'player'
            }
        });

    };

    return Address;

};