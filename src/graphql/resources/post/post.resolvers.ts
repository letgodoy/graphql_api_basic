import * as graphqlFields from 'graphql-fields';
import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { PostInstance } from "../../../models/PostModel";
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

export const postResolvers = {

    Post: {

        user: (post, args, {db, dataloaders: {userLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {  
            return userLoader
                .load({key: post.get('user'), info})
                .catch(handleError);
        },

        file: (post, args, {db, dataloaders: {fileLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {  
            return fileLoader
                .load({key: post.get('file'), info})
                .catch(handleError);
        },

        thumbnail: (post, args, {db, dataloaders: {fileLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {  
            return fileLoader
                .load({key: post.get('thumbnail'), info})
                .catch(handleError);
        }

    },

    Query: {

        posts: (parent, { first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Post
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id']})
                }).catch(handleError);
        },

        post: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Post
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id']})
                })
                .then((post: PostInstance) => {
                    throwError(!post, `Post com id ${id} não encontrado!`);
                    return post;
                }).catch(handleError);
        }

    },

    Mutation: {

        createPost: compose(...authResolvers)((parent, { input }, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t: Transaction) => {
                throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                return db.Post
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updatePost: compose(...authResolvers)((parent, { id, input }, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: PostInstance) => {
                        throwError(!post, `Post com id ${id} não encontrado!`);
                        throwError(post.get('user') != authUser.id, `Unauthorized! You can only edit posts by yourself!`);
                        throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                        return post.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deletePost: compose(...authResolvers)((parent, { id }, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: PostInstance) => {
                        throwError(!post, `Post com id ${id} não encontrado!`);
                        throwError(post.get('user') != authUser.id, `Unauthorized! You can only delete posts by yourself!`);
                        throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                        return post.destroy({transaction: t})
                            .then(post => !!post);
                    });
            }).catch(handleError);
        })

    }

};