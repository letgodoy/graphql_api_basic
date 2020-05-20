import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface"
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { NewsInstance } from "../../../models/NewsModel";

export const newsResolvers = {

    News: {

        user: (news, args, {db, dataloaders: {userLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return userLoader
                .load({key: news.get('user'), info})
                .catch(handleError);
        },

    },

    Query: {

        allNews: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.News
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['skillses']})
                }).catch(handleError);
        },

        news: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.News
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['skillses']})
                })
                .then((news: NewsInstance) => {
                    throwError(!news, `Noticia com id ${id} não encontrado!`);
                    return news;
                }).catch(handleError);
        }

    },

    Mutation: {

        createNews: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t: Transaction) => {
                throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                return db.News
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updateNews: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.News
                    .findById(id)
                    .then((news: NewsInstance) => {
                        throwError(!news, `Noticia com id ${id} não encontrado!`);
                        throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                        return news.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deleteNews: compose(...authResolvers)((parent, {id}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.News
                    .findById(id)
                    .then((news: NewsInstance) => {
                        throwError(!news, `Categoria com id ${id} não encontrado!`);
                        throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                        return news.destroy({transaction: t})
                            .then(news => !!news);
                    });
            }).catch(handleError);
        })

    }

};