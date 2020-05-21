import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { RankInstance } from "../../../models/RankModel";

export const rankResolvers = {

    Rank: {

        player: (rank, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: rank.get('player'), info})
                .catch(handleError);
        },
        
        from: (rank, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: rank.get('from'), info})
                .catch(handleError);
        },
        
        propose: (rank, args, {db, dataloaders: {proposeLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return proposeLoader
                .load({key: rank.get('propose'), info})
                .catch(handleError);
        }

    },

    Query: {

        allRanks: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Rank
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['player']})
                }).catch(handleError);
        },

        rank: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Rank
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['player']})
                })
                .then((rank: RankInstance) => {
                    throwError(!rank, `Endereço com id ${id} não encontrado!`);
                    return rank;
                }).catch(handleError);
        }

    },

    Mutation: {

        createRank: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.from = authUser.player;
            return db.sequelize.transaction((t: Transaction) => {
                return db.Rank
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updateRank: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Rank
                    .findById(id)
                    .then((rank: RankInstance) => {
                        throwError(!rank, `Endereço com id ${id} não encontrado!`);
                        throwError(rank.get('player') != authUser.player, `Não autorizado! Você só pode editar seu proprio endereço!`);
                        input.player = authUser.player;
                        return rank.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deleteRank: compose(...authResolvers)((parent, {id}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Rank
                    .findById(id)
                    .then((rank: RankInstance) => {
                        throwError(!rank, `Endereço com id ${id} não encontrado!`);
                        throwError(rank.get('player') != authUser.player, `Não autorizado! Você só pode deletar seu proprio endereço!`);
                        return rank.destroy({transaction: t})
                            .then(rank => !!rank);
                    });
            }).catch(handleError);
        })

    }

};