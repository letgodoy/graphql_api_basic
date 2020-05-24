"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.chatResolvers = {
    Chat: {
        from: (chat, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: chat.get('from'), info })
                .catch(utils_1.handleError);
        },
        to: (chat, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: chat.get('to'), info })
                .catch(utils_1.handleError);
        },
        propose: (chat, args, { db, dataloaders: { proposeLoader } }, info) => {
            return proposeLoader
                .load({ key: chat.get('proposes'), info })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        allChats: (parent, { first = 50, offset = 0 }, context, info) => {
            return context.db.Chat
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['anuncios'] })
            }).catch(utils_1.handleError);
        },
        chat: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.Chat
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['Chats'] })
            })
                .then((chat) => {
                utils_1.throwError(!chat, `Mensagem com id ${id} não encontrado!`);
                return chat;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createChat: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.from = authUser.player;
            return db.sequelize.transaction((t) => {
                return db.Chat
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updateChat: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Chat
                    .findById(id)
                    .then((chat) => {
                    utils_1.throwError(!chat, `Mensagem com id ${id} não encontrado!`);
                    return chat.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deleteChat: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Chat
                    .findById(id)
                    .then((chat) => {
                    utils_1.throwError(!chat, `Mensagem com id ${id} não encontrado!`);
                    utils_1.throwError(chat.get('from') != authUser.player, `Não autorizado! Você só pode alterar seus proprios mensagens!`);
                    return chat.destroy({ transaction: t })
                        .then(chat => !!chat);
                });
            }).catch(utils_1.handleError);
        })
    }
};
