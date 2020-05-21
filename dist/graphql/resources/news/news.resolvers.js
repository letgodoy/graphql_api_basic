"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.newsResolvers = {
    News: {
        user: (news, args, { db, dataloaders: { userLoader } }, info) => {
            return userLoader
                .load({ key: news.get('user'), info })
                .catch(utils_1.handleError);
        },
    },
    Query: {
        allNews: (parent, { first = 50, offset = 0 }, context, info) => {
            return context.db.News
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['skillses'] })
            }).catch(utils_1.handleError);
        },
        news: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.News
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['skillses'] })
            })
                .then((news) => {
                utils_1.throwError(!news, `Noticia com id ${id} não encontrado!`);
                return news;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createNews: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t) => {
                utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                return db.News
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updateNews: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.News
                    .findById(id)
                    .then((news) => {
                    utils_1.throwError(!news, `Noticia com id ${id} não encontrado!`);
                    utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                    return news.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deleteNews: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.News
                    .findById(id)
                    .then((news) => {
                    utils_1.throwError(!news, `Categoria com id ${id} não encontrado!`);
                    utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                    return news.destroy({ transaction: t })
                        .then(news => !!news);
                });
            }).catch(utils_1.handleError);
        })
    }
};
