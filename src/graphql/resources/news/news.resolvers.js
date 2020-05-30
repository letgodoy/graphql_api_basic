const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  News: {
    user: (news, args, { dataloaders: { userLoader } }, info) => {
      return userLoader.load({ key: news.get('user'), info }).catch(handleError)
    },
  },
  Query: {
    allNews: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.News.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['skillses'],
        }),
      }).catch(handleError)
    },
    news: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.News.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['skillses'],
        }),
      })
        .then((news) => {
          throwError(!news, `Noticia com id ${id} não encontrado!`)
          return news
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createNews: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.user = authUser.id
        return db.sequelize
          .transaction((t) => {
            throwError(
              authUser.role != 'ADMINA',
              `Não autorizado! Você não tem permissoes para isso!`
            )
            return db.News.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updateNews: compose(
      authResolvers,
      (parent, { id, input }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.News.findById(id).then((news) => {
              throwError(!news, `Noticia com id ${id} não encontrado!`)
              throwError(
                authUser.role != 'ADMINA',
                `Não autorizado! Você não tem permissoes para isso!`
              )
              return news.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deleteNews: compose(authResolvers, (parent, { id }, { db, authUser }) => {
      // id = parseInt(id);
      return db.sequelize
        .transaction((t) => {
          return db.News.findById(id).then((news) => {
            throwError(!news, `Categoria com id ${id} não encontrado!`)
            throwError(
              authUser.role != 'ADMINA',
              `Não autorizado! Você não tem permissoes para isso!`
            )
            return news.destroy({ transaction: t }).then((news) => !!news)
          })
        })
        .catch(handleError)
    }),
  },
}
