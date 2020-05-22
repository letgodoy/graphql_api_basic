import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface"
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { ChatInstance } from "../../../models/ChatModel";

export const chatResolvers = {

    Chat: {

        from: (chat, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: chat.get('from'), info})
                .catch(handleError);
        },

        to: (chat, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: chat.get('to'), info})
                .catch(handleError);
        },

        propose: (chat, args, {db, dataloaders: {proposeLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return proposeLoader
                .load({key: chat.get('proposes'), info})
                .catch(handleError);
        }

    },

    Query: {

        allChats: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Chat
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['anuncios']})
                }).catch(handleError);
        },

        chat: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Chat
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['Chats']})
                })
                .then((chat: ChatInstance) => {
                    throwError(!chat, `Mensagem com id ${id} não encontrado!`);
                    return chat;
                }).catch(handleError);
        }

    },

    Mutation: {

        createChat: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.from = authUser.player;
            return db.sequelize.transaction((t: Transaction) => {
                return db.Chat
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updateChat: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Chat
                    .findById(id)
                    .then((chat: ChatInstance) => {
                        throwError(!chat, `Mensagem com id ${id} não encontrado!`);
                        return chat.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deleteChat: compose(...authResolvers)((parent, {id}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Chat
                    .findById(id)
                    .then((chat: ChatInstance) => {
                        throwError(!chat, `Mensagem com id ${id} não encontrado!`);
                        throwError(chat.get('player') != authUser.player, `Não autorizado! Você só pode alterar seus proprios mensagens!`);
                        return chat.destroy({transaction: t})
                            .then(chat => !!chat);
                    });
            }).catch(handleError);
        })

    }

};