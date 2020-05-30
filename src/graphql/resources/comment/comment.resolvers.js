const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Comment: {
    from: (comment, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader
        .load({ key: comment.get('from'), info })
        .catch(handleError)
    },
    to: (comment, args, { dataloaders: { playerLoader } }, info) => {
      return playerLoader
        .load({ key: comment.get('to'), info })
        .catch(handleError)
    },
    propose: (comment, args, { dataloaders: { proposeLoader } }, info) => {
      return proposeLoader
        .load({ key: comment.get('propose'), info })
        .catch(handleError)
    },
  },
  Query: {
    // commentsByPost: compose()((parent, {postId, first = 10, offset = 0}, {db, requestedFields}: {db: DbConnection, requestedFields: RequestedFields}, info: GraphQLResolveInfo) => {
    //     postId = parseInt(postId);
    //     return db.Comment
    //         .findAll({
    //             where: {post: postId},
    //             limit: first,
    //             offset: offset,
    //             attributes: requestedFields.getFields(info, {keep: undefined})
    //         })
    //         .catch(handleError);
    // })
    allComments: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.Comment.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['from', 'to', 'propose'],
        }),
      }).catch(handleError)
    },
    comment: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Comment.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['from', 'to', 'propose'],
        }),
      })
        .then((comment) => {
          throwError(!comment, `Endereço com id ${id} não encontrado!`)
          return comment
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createComment: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.from = authUser.player
        return db.sequelize
          .transaction((t) => {
            return db.Comment.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updateComment: compose(authResolvers, (parent, { id, input }, { db }) => {
      // id = parseInt(id)
      return db.sequelize
        .transaction((t) => {
          return db.Comment.findById(id).then((comment) => {
            throwError(!comment, `Avaliação com id ${id} não econtrado!`)
            return comment.update(input, { transaction: t })
          })
        })
        .catch(handleError)
    }),
    deleteComment: compose(
      authResolvers,
      (parent, { id }, { db, authUser }) => {
        id = parseInt(id)
        return db.sequelize
          .transaction((t) => {
            return db.Comment.findById(id).then((comment) => {
              throwError(!comment, `Avaliação com id ${id} não econtrado!`)
              throwError(
                comment.get('from') != authUser.player,
                `Unauthorized! You can only delete comments by yourself!`
              )
              return comment
                .destroy({ transaction: t })
                .then((comment) => !!comment)
            })
          })
          .catch(handleError)
      }
    ),
  },
}
