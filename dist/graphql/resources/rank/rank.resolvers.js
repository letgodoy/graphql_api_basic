"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.rankResolvers = {
    Rank: {
        player: (rank, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: rank.get('player'), info })
                .catch(utils_1.handleError);
        },
        from: (rank, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: rank.get('from'), info })
                .catch(utils_1.handleError);
        },
        propose: (rank, args, { db, dataloaders: { proposeLoader } }, info) => {
            return proposeLoader
                .load({ key: rank.get('propose'), info })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        allRanks: (parent, { first = 50, offset = 0 }, context, info) => {
            return context.db.Rank
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['player'] })
            }).catch(utils_1.handleError);
        },
        rank: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.Rank
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['player'] })
            })
                .then((rank) => {
                utils_1.throwError(!rank, `Endereço com id ${id} não encontrado!`);
                return rank;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createRank: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.from = authUser.player;
            return db.sequelize.transaction((t) => {
                return db.Rank
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updateRank: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Rank
                    .findById(id)
                    .then((rank) => {
                    utils_1.throwError(!rank, `Endereço com id ${id} não encontrado!`);
                    utils_1.throwError(rank.get('player') != authUser.player, `Não autorizado! Você só pode editar seu proprio endereço!`);
                    input.player = authUser.player;
                    return rank.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deleteRank: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Rank
                    .findById(id)
                    .then((rank) => {
                    utils_1.throwError(!rank, `Endereço com id ${id} não encontrado!`);
                    utils_1.throwError(rank.get('player') != authUser.player, `Não autorizado! Você só pode deletar seu proprio endereço!`);
                    return rank.destroy({ transaction: t })
                        .then(rank => !!rank);
                });
            }).catch(utils_1.handleError);
        })
    }
};
