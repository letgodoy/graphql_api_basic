"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.notificationResolvers = {
    Notification: {
        player: (notification, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: notification.get('player'), info })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        allNotifications: (parent, { first = 50, offset = 0 }, context, info) => {
            return context.db.Notification
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['player'] })
            }).catch(utils_1.handleError);
        },
        notification: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.Notification
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['player'] })
            })
                .then((notification) => {
                utils_1.throwError(!notification, `Notificacao com id ${id} não encontrado!`);
                return notification;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createNotification: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.from = authUser.player;
            return db.sequelize.transaction((t) => {
                return db.Notification
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updateNotification: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Notification
                    .findById(id)
                    .then((notification) => {
                    utils_1.throwError(!notification, `Notificacao com id ${id} não encontrado!`);
                    return notification.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deleteNotification: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Notification
                    .findById(id)
                    .then((notification) => {
                    utils_1.throwError(!notification, `Notificacao com id ${id} não encontrado!`);
                    utils_1.throwError(notification.get('player') != authUser.player, `Não autorizado! Você só pode alterar seus proprios notificacoes!`);
                    return notification.destroy({ transaction: t })
                        .then(notification => !!notification);
                });
            }).catch(utils_1.handleError);
        })
    }
};
