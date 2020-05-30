const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Post: {
    user: (post, args, { dataloaders: { userLoader } }, info) => {
      return userLoader.load({ key: post.get('user'), info }).catch(handleError)
    },
    file: (post, args, { dataloaders: { fileLoader } }, info) => {
      return fileLoader.load({ key: post.get('file'), info }).catch(handleError)
    },
    thumbnail: (post, args, { dataloaders: { fileLoader } }, info) => {
      return fileLoader
        .load({ key: post.get('thumbnail'), info })
        .catch(handleError)
    },
  },
  Query: {
    posts: (parent, { first = 10, offset = 0 }, context, info) => {
      return context.db.Post.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, { keep: ['id'] }),
      }).catch(handleError)
    },
    post: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Post.findById(id, {
        attributes: context.requestedFields.getFields(info, { keep: ['id'] }),
      })
        .then((post) => {
          throwError(!post, `Post com id ${id} não encontrado!`)
          return post
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createPost: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.user = authUser.id
        return db.sequelize
          .transaction((t) => {
            throwError(
              authUser.role != 'ADMINA',
              `Não autorizado! Você não tem permissoes para isso!`
            )
            return db.Post.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updatePost: compose(
      authResolvers,
      (parent, { id, input }, { db, authUser }) => {
        id = parseInt(id)
        return db.sequelize
          .transaction((t) => {
            return db.Post.findById(id).then((post) => {
              throwError(!post, `Post com id ${id} não encontrado!`)
              throwError(
                post.get('user') != authUser.id,
                `Unauthorized! You can only edit posts by yourself!`
              )
              throwError(
                authUser.role != 'ADMINA',
                `Não autorizado! Você não tem permissoes para isso!`
              )
              return post.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deletePost: compose(authResolvers, (parent, { id }, { db, authUser }) => {
      id = parseInt(id)
      return db.sequelize
        .transaction((t) => {
          return db.Post.findById(id).then((post) => {
            throwError(!post, `Post com id ${id} não encontrado!`)
            throwError(
              post.get('user') != authUser.id,
              `Unauthorized! You can only delete posts by yourself!`
            )
            throwError(
              authUser.role != 'ADMINA',
              `Não autorizado! Você não tem permissoes para isso!`
            )
            return post.destroy({ transaction: t }).then((post) => !!post)
          })
        })
        .catch(handleError)
    }),
  },
}
