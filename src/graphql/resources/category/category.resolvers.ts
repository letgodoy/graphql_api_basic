import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface"
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { CategoryInstance } from "../../../models/CategoryModel";

export const categoryResolvers = {

    Category: {

        user: (category, args, {db, dataloaders: {userLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return userLoader
                .load({key: category.get('user'), info})
                .catch(handleError);
        },

        skills: (anuncio, args, {db, dataloaders: {skillsLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return skillsLoader
                .load({key: anuncio.get('skillses'), info})
                .catch(handleError);
        }

    },

    Query: {

        allCategories: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Category
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['skillses']})
                }).catch(handleError);
        },

        category: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Category
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['skillses']})
                })
                .then((category: CategoryInstance) => {
                    throwError(!category, `Categoria com id ${id} não encontrado!`);
                    return category;
                }).catch(handleError);
        }

    },

    Mutation: {

        createCategory: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t: Transaction) => {
                throwError(authUser.player != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                return db.Category
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updateCategory: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Category
                    .findById(id)
                    .then((category: CategoryInstance) => {
                        throwError(!category, `Categoria com id ${id} não encontrado!`);
                        throwError(authUser.player != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                        return category.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deleteCategory: compose(...authResolvers)((parent, {id}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Category
                    .findById(id)
                    .then((category: CategoryInstance) => {
                        throwError(!category, `Categoria com id ${id} não encontrado!`);
                        throwError(authUser.player != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                        return category.destroy({transaction: t})
                            .then(category => !!category);
                    });
            }).catch(handleError);
        })

    }

};