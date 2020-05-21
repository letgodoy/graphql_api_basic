"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.categoryResolvers = {
    Category: {
        user: (category, args, { db, dataloaders: { userLoader } }, info) => {
            return userLoader
                .load({ key: category.get('user'), info })
                .catch(utils_1.handleError);
        },
        skills: (category, args, { db, dataloaders: { skillsLoader } }, info) => {
            return skillsLoader
                .load({ key: category.get('skillses'), info })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        allCategories: (parent, { first = 50, offset = 0 }, context, info) => {
            return context.db.Category
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['skillses'] })
            }).catch(utils_1.handleError);
        },
        category: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.Category
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['skillses'] })
            })
                .then((category) => {
                utils_1.throwError(!category, `Categoria com id ${id} não encontrado!`);
                return category;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createCategory: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t) => {
                utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                return db.Category
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updateCategory: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Category
                    .findById(id)
                    .then((category) => {
                    utils_1.throwError(!category, `Categoria com id ${id} não encontrado!`);
                    utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                    return category.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deleteCategory: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Category
                    .findById(id)
                    .then((category) => {
                    utils_1.throwError(!category, `Categoria com id ${id} não encontrado!`);
                    utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                    return category.destroy({ transaction: t })
                        .then(category => !!category);
                });
            }).catch(utils_1.handleError);
        })
    }
};
