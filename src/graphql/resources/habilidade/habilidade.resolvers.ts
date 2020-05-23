import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface"
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { HabilidadeInstance } from "../../../models/HabilidadeModel";

export const habilidadeResolvers = {

    Habilidade: {

        player: (habilidade, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: habilidade.get('player'), info})
                .catch(handleError);
        }

    },

    Query: {

        allHabilidades: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Habilidade
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['player']})
                }).catch(handleError);
        },

        habilidade: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Habilidade
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['player']})
                })
                .then((habilidade: HabilidadeInstance) => {
                    throwError(!habilidade, `Habilidade com id ${id} não encontrado!`);
                    return habilidade;
                }).catch(handleError);
        }

    },

    Mutation: {

        createHabilidade: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.player = authUser.player;
            return db.sequelize.transaction((t: Transaction) => {
                return db.Habilidade
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updateHabilidade: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Habilidade
                    .findById(id)
                    .then((habilidade: HabilidadeInstance) => {
                        throwError(!habilidade, `Habilidade com id ${id} não encontrado!`);
                        return habilidade.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deleteHabilidade: compose(...authResolvers)((parent, {id}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Habilidade
                    .findById(id)
                    .then((habilidade: HabilidadeInstance) => {
                        throwError(!habilidade, `Habilidade com id ${id} não encontrado!`);
                        return habilidade.destroy({transaction: t})
                            .then(habilidade => !!habilidade);
                    });
            }).catch(handleError);
        })

    }

};