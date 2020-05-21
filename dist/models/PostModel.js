"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
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
    }, {
        tableName: 'posts'
    });
    Post.associate = (models) => {
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
