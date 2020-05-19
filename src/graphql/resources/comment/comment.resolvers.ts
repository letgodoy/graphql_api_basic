import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { CommentInstance } from "../../../models/CommentsModel";
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { RequestedFields } from "../../ast/RequestedFields";

export const commentResolvers = {

    Comment: {

        from: (comment, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: comment.get('from'), info})
                .catch(handleError);
        },

        to: (comment, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: comment.get('to'), info})
                .catch(handleError);
        },

        propose: (comment, args, {db, dataloaders: {proposeLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return proposeLoader
                .load({key: comment.get('propose'), info})
                .catch(handleError);
        }

    },

    Query: {

        commentsByPost: compose()((parent, {postId, first = 10, offset = 0}, {db, requestedFields}: {db: DbConnection, requestedFields: RequestedFields}, info: GraphQLResolveInfo) => {
            postId = parseInt(postId);
            return db.Comment
                .findAll({
                    where: {post: postId},
                    limit: first,
                    offset: offset,
                    attributes: requestedFields.getFields(info, {keep: undefined})
                })
                .catch(handleError);
        })

    },

    Mutation: {

        createComment: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.from = authUser.player;
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updateComment: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: CommentInstance) => {
                        throwError(!comment, `Avaliação com id ${id} não econtrado!`);
                        input.user = authUser.id;
                        return comment.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deleteComment: compose(...authResolvers)((parent, {id}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: CommentInstance) => {
                        throwError(!comment, `Avaliação com id ${id} não econtrado!`);
                        throwError(comment.get('from') != authUser.player, `Unauthorized! You can only delete comments by yourself!`);
                        return comment.destroy({transaction: t})
                            .then(comment => !!comment);
                    });
            }).catch(handleError);
        })

    }

};