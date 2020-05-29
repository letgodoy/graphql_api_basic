import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface FileAttributes {
    id?: string;
    contentType?: string;
    name?: string;
    url?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface FileInstance extends Sequelize.Instance<FileAttributes> {}

export interface FileModel extends BaseModelInterface, Sequelize.Model<FileInstance, FileAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): FileModel => {

    const File: FileModel = sequelize.define('File', {
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
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'Files'
    });

    // File.associate = (models: ModelsInterface): void => {

    //     File.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false,
    //             field: 'user',
    //             name: 'user'
    //         }
    //     });

    // };

    return File;

};