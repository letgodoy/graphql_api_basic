import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface"
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { NotificationInstance } from "../../../models/NotificationModel";

export const notificationResolvers = {

    Notification: {

        player: (notification, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: notification.get('player'), info})
                .catch(handleError);
        }

    },

    Query: {

        allNotifications: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Notification
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['player']})
                }).catch(handleError);
        },

        notification: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Notification
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['player']})
                })
                .then((notification: NotificationInstance) => {
                    throwError(!notification, `Notificacao com id ${id} não encontrado!`);
                    return notification;
                }).catch(handleError);
        }

    },

    Mutation: {

        createNotification: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.from = authUser.player;
            return db.sequelize.transaction((t: Transaction) => {
                return db.Notification
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updateNotification: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Notification
                    .findById(id)
                    .then((notification: NotificationInstance) => {
                        throwError(!notification, `Notificacao com id ${id} não encontrado!`);
                        return notification.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deleteNotification: compose(...authResolvers)((parent, {id}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Notification
                    .findById(id)
                    .then((notification: NotificationInstance) => {
                        throwError(!notification, `Notificacao com id ${id} não encontrado!`);
                        throwError(notification.get('player') != authUser.player, `Não autorizado! Você só pode alterar seus proprios notificacoes!`);
                        return notification.destroy({transaction: t})
                            .then(notification => !!notification);
                    });
            }).catch(handleError);
        })

    }

};