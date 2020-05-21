"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.skillsResolvers = {
    Skills: {
        user: (skills, args, { db, dataloaders: { userLoader } }, info) => {
            return userLoader
                .load({ key: skills.get('user'), info })
                .catch(utils_1.handleError);
        },
        skills: (skills, args, { db, dataloaders: { skillsLoader } }, info) => {
            return skillsLoader
                .load({ key: skills.get('skillses'), info })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        allSkillses: (parent, { first = 50, offset = 0 }, context, info) => {
            return context.db.Skills
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['skillses'] })
            }).catch(utils_1.handleError);
        },
        skills: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.Skills
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['skillses'] })
            })
                .then((skills) => {
                utils_1.throwError(!skills, `Habilidade com id ${id} não encontrado!`);
                return skills;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createSkills: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t) => {
                utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                return db.Skills
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updateSkills: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Skills
                    .findById(id)
                    .then((skills) => {
                    utils_1.throwError(!skills, `Habilidade com id ${id} não encontrado!`);
                    utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                    return skills.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deleteSkills: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Skills
                    .findById(id)
                    .then((skills) => {
                    utils_1.throwError(!skills, `Habilidade com id ${id} não encontrado!`);
                    utils_1.throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                    return skills.destroy({ transaction: t })
                        .then(skills => !!skills);
                });
            }).catch(utils_1.handleError);
        })
    }
};
