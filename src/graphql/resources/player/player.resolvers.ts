import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface"
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { PlayerInstance } from "../../../models/PlayerModel";

export const playerResolvers = {

    Player: {

        address: (player, args, {db, dataloaders: {addressLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return addressLoader
                .load({key: player.get('address'), info})
                .catch(handleError);
        },

        chatsFrom: (player, args, {db, dataloaders: {chatLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return chatLoader
                .load({key: player.get('chatsFrom'), info})
                .catch(handleError);
        },

        chatsTo: (player, args, {db, dataloaders: {chatLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return chatLoader
                .load({key: player.get('chatsTo'), info})
                .catch(handleError);
        },

        commentsTo: (player, args, {db, dataloaders: {commentLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return commentLoader
                .load({key: player.get('commentsTo'), info})
                .catch(handleError);
        },

        commentsfrom: (player, args, {db, dataloaders: {commentLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return commentLoader
                .load({key: player.get('commentsfrom'), info})
                .catch(handleError);
        },

        notifications: (player, args, {db, dataloaders: {notificationLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return notificationLoader
                .load({key: player.get('notifications'), info})
                .catch(handleError);
        },

        proposes: (player, args, {db, dataloaders: {proposeLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return proposeLoader
                .load({key: player.get('proposes'), info})
                .catch(handleError);
        },

        proposesFrom: (player, args, {db, dataloaders: {proposeLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return proposeLoader
                .load({key: player.get('proposesFrom'), info})
                .catch(handleError);
        },

        ranks: (player, args, {db, dataloaders: {rankLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return rankLoader
                .load({key: player.get('ranks'), info})
                .catch(handleError);
        },

        anuncioses: (player, args, {db, dataloaders: {anuncioLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return anuncioLoader
                .load({key: player.get('anuncioses'), info})
                .catch(handleError);
        },

        ranksmaked: (player, args, {db, dataloaders: {rankLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return rankLoader
                .load({key: player.get('ranksmaked'), info})
                .catch(handleError);
        },

        photo: (player, args, {db, dataloaders: {fileLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return fileLoader
                .load({key: player.get('photo'), info})
                .catch(handleError);
        },

    },

    Query: {

        allPlayers: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Player
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['Players']})
                }).catch(handleError);
        },

        player: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Player
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['Players']})
                })
                .then((player: PlayerInstance) => {
                    throwError(!player, `Perfil com id ${id} não encontrado!`);
                    return player;
                }).catch(handleError);
        }

    },

    Mutation: {

        createPlayer: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t: Transaction) => {
                return db.Player
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updatePlayer: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Player
                    .findById(authUser.player)
                    .then((player: PlayerInstance) => {
                        throwError(!player, `Player com id ${authUser.player} não encontrado!`);
                        throwError(player.get('user') != authUser.id, `Não autorizado! Você só pode alterar seus proprios Perfil!`);
                        return player.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deletePlayer: compose(...authResolvers)((parent, args, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Player
                    .findById(authUser.player)
                    .then((player: PlayerInstance) => {
                        throwError(!player, `Perfil com id ${authUser.player} não encontrado!`);
                        throwError(player.get('user') != authUser.id, `Não autorizado! Você só pode alterar seus proprios Perfil!`);
                        return player.destroy({transaction: t})
                            .then(player => !!player);
                    });
            }).catch(handleError);
        })

    }

};