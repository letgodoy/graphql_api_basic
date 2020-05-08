import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface PostAttributes {
    id?: number;
    title?: string;
    content?: string;
    file?: string;
    thumbnail?: number;
    published?: boolean;
    categoria?: string;

    user?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PostInstance extends Sequelize.Instance<PostAttributes> {}

export interface PostModel extends BaseModelInterface, Sequelize.Model<PostInstance, PostAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PostModel => {

    const Post: PostModel = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        file: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // photo: {
        //     type: DataTypes.BLOB({
        //         length: 'long'
        //     }),
        //     allowNull: false
        // }
    }, {
        tableName: 'posts'
    });

    Post.associate = (models: ModelsInterface): void => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    };

    return Post;

};