"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.commentResolvers = {
    Comment: {
        from: (comment, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: comment.get('from'), info })
                .catch(utils_1.handleError);
        },
        to: (comment, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: comment.get('to'), info })
                .catch(utils_1.handleError);
        },
        propose: (comment, args, { db, dataloaders: { proposeLoader } }, info) => {
            return proposeLoader
                .load({ key: comment.get('propose'), info })
                .catch(utils_1.handleError);
        }
    },
    Query: {},
    Mutation: {
        createComment: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.from = authUser.player;
            return db.sequelize.transaction((t) => {
                return db.Comment
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updateComment: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Comment
                    .findById(id)
                    .then((comment) => {
                    utils_1.throwError(!comment, `Avaliação com id ${id} não econtrado!`);
                    input.user = authUser.id;
                    return comment.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deleteComment: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Comment
                    .findById(id)
                    .then((comment) => {
                    utils_1.throwError(!comment, `Avaliação com id ${id} não econtrado!`);
                    utils_1.throwError(comment.get('from') != authUser.player, `Unauthorized! You can only delete comments by yourself!`);
                    return comment.destroy({ transaction: t })
                        .then(comment => !!comment);
                });
            }).catch(utils_1.handleError);
        })
    }
};
