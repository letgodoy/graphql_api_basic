"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.postResolvers = {
    Post: {
        user: (post, args, { db, dataloaders: { userLoader } }, info) => {
            return userLoader
                .load({ key: post.get('user'), info })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        posts: (parent, { first = 10, offset = 0 }, context, info) => {
            return context.db.Post
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'] })
            }).catch(utils_1.handleError);
        },
        post: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.Post
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'] })
            })
                .then((post) => {
                utils_1.throwError(!post, `Post com id ${id} não encontrado!`);
                return post;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createPost: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t) => {
                utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                return db.Post
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updatePost: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Post
                    .findById(id)
                    .then((post) => {
                    utils_1.throwError(!post, `Post com id ${id} não encontrado!`);
                    utils_1.throwError(post.get('user') != authUser.id, `Unauthorized! You can only edit posts by yourself!`);
                    utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                    return post.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deletePost: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Post
                    .findById(id)
                    .then((post) => {
                    utils_1.throwError(!post, `Post com id ${id} não encontrado!`);
                    utils_1.throwError(post.get('user') != authUser.id, `Unauthorized! You can only delete posts by yourself!`);
                    utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                    return post.destroy({ transaction: t })
                        .then(post => !!post);
                });
            }).catch(utils_1.handleError);
        })
    }
};
