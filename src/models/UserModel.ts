import * as Sequelize from 'sequelize';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface UserAttributes {
    id?: number;
    email?: string;
    password?: string;
    role?: string;
    
    createdAt?: string;
    updatedAt?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {

    const User: UserModel = 
        sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            role: {
                type: DataTypes.ENUM,
                values: ["USER", "ADMIND", "ADMINA"],
                allowNull: false,
                defaultValue: "USER"
            }
        }, {
            tableName: 'users',
            hooks: {
                beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                    const salt = genSaltSync();
                    user.password = hashSync(user.password, salt);
                },
                beforeUpdate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                    if (user.changed('password')) {
                        const salt = genSaltSync();
                        user.password = hashSync(user.password, salt);
                    }
                }
            }
        });

        User.associate = (models: ModelsInterface): void => {};

        User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
            return compareSync(password, encodedPassword);
        }
        
    return User;

};