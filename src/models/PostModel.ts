import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface PostAttributes {
    id?: number;
    title?: string;
    content?: string;
    published?: boolean;
    categoria?: string;

    file?: string;
    thumbnail?: string;

    user?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PostInstance extends Sequelize.Instance<PostAttributes> {}

export interface PostModel extends BaseModelInterface, Sequelize.Model<PostInstance, PostAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PostModel => {

    const Post: PostModel = sequelize.define('Post', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
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

        Post.belongsTo(models.File, {
            foreignKey: {
                allowNull: true,
                field: 'file',
                name: 'file'
            }
        });

        Post.belongsTo(models.File, {
            foreignKey: {
                allowNull: true,
                field: 'thumbnail',
                name: 'thumbnail'
            }
        });
    };

    return Post;

};