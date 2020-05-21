"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.playerResolvers = {
    Player: {
        address: (player, args, { db, dataloaders: { addressLoader } }, info) => {
            return addressLoader
                .load({ key: player.get('address'), info })
                .catch(utils_1.handleError);
        },
        chatsFrom: (player, args, { db, dataloaders: { chatLoader } }, info) => {
            return chatLoader
                .load({ key: player.get('chatsFrom'), info })
                .catch(utils_1.handleError);
        },
        chatsTo: (player, args, { db, dataloaders: { chatLoader } }, info) => {
            return chatLoader
                .load({ key: player.get('chatsTo'), info })
                .catch(utils_1.handleError);
        },
        commentsTo: (player, args, { db, dataloaders: { commentsLoader } }, info) => {
            return commentsLoader
                .load({ key: player.get('commentsTo'), info })
                .catch(utils_1.handleError);
        },
        commentsfrom: (player, args, { db, dataloaders: { commentsLoader } }, info) => {
            return commentsLoader
                .load({ key: player.get('commentsfrom'), info })
                .catch(utils_1.handleError);
        },
        notifications: (player, args, { db, dataloaders: { notificationLoader } }, info) => {
            return notificationLoader
                .load({ key: player.get('notifications'), info })
                .catch(utils_1.handleError);
        },
        proposes: (player, args, { db, dataloaders: { proposeLoader } }, info) => {
            return proposeLoader
                .load({ key: player.get('proposes'), info })
                .catch(utils_1.handleError);
        },
        proposesFrom: (player, args, { db, dataloaders: { proposeLoader } }, info) => {
            return proposeLoader
                .load({ key: player.get('proposesFrom'), info })
                .catch(utils_1.handleError);
        },
        ranks: (player, args, { db, dataloaders: { rankLoader } }, info) => {
            return rankLoader
                .load({ key: player.get('ranks'), info })
                .catch(utils_1.handleError);
        },
        anuncioses: (player, args, { db, dataloaders: { anunciosLoader } }, info) => {
            return anunciosLoader
                .load({ key: player.get('anuncioses'), info })
                .catch(utils_1.handleError);
        },
        ranksmaked: (player, args, { db, dataloaders: { rankLoader } }, info) => {
            return rankLoader
                .load({ key: player.get('ranksmaked'), info })
                .catch(utils_1.handleError);
        },
    },
    Query: {
        allPlayers: (parent, { first = 50, offset = 0 }, context, info) => {
            return context.db.Player
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['Players'] })
            }).catch(utils_1.handleError);
        },
        player: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.Player
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['Players'] })
            })
                .then((player) => {
                utils_1.throwError(!player, `Perfil com id ${id} não encontrado!`);
                return player;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createPlayer: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t) => {
                return db.Player
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updatePlayer: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Player
                    .findById(authUser.player)
                    .then((player) => {
                    utils_1.throwError(!player, `Player com id ${authUser.player} não encontrado!`);
                    utils_1.throwError(player.get('user') != authUser.id, `Não autorizado! Você só pode alterar seus proprios Perfil!`);
                    return player.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deletePlayer: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, args, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Player
                    .findById(authUser.player)
                    .then((player) => {
                    utils_1.throwError(!player, `Perfil com id ${authUser.player} não encontrado!`);
                    utils_1.throwError(player.get('user') != authUser.id, `Não autorizado! Você só pode alterar seus proprios Perfil!`);
                    return player.destroy({ transaction: t })
                        .then(player => !!player);
                });
            }).catch(utils_1.handleError);
        })
    }
};
