import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface"
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { SkillsInstance } from "../../../models/SkillsModel";

export const skillsResolvers = {

    Skills: {

        user: (skills, args, {db, dataloaders: {userLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return userLoader
                .load({key: skills.get('user'), info})
                .catch(handleError);
        },

        skills: (skills, args, {db, dataloaders: {skillsLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return skillsLoader
                .load({key: skills.get('skillses'), info})
                .catch(handleError);
        }

    },

    Query: {

        allSkillses: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Skills
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['skillses']})
                }).catch(handleError);
        },

        skills: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Skills
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['skillses']})
                })
                .then((skills: SkillsInstance) => {
                    throwError(!skills, `Habilidade com id ${id} não encontrado!`);
                    return skills;
                }).catch(handleError);
        }

    },

    Mutation: {

        createSkills: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t: Transaction) => {
                throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                return db.Skills
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updateSkills: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Skills
                    .findById(id)
                    .then((skills: SkillsInstance) => {
                        throwError(!skills, `Habilidade com id ${id} não encontrado!`);
                        throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                        return skills.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deleteSkills: compose(...authResolvers)((parent, {id}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Skills
                    .findById(id)
                    .then((skills: SkillsInstance) => {
                        throwError(!skills, `Habilidade com id ${id} não encontrado!`);
                        throwError(authUser.role != "ADMINA", `Não autorizado! Você não tem permissoes para isso!`);
                        return skills.destroy({transaction: t})
                            .then(skills => !!skills);
                    });
            }).catch(handleError);
        })

    }

};