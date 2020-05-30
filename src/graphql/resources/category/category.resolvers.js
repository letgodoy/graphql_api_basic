const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Category: {
    user: (category, args, { dataloaders: { userLoader } }, info) => {
      return userLoader
        .load({ key: category.get('user'), info })
        .catch(handleError)
    },
    skillses: (category, args, { dataloaders: { skillsLoader } }, info) => {
      return skillsLoader
        .load({ key: category.get('skillses'), info })
        .catch(handleError)
    },
    file: (category, args, { dataloaders: { fileLoader } }, info) => {
      return fileLoader
        .load({ key: category.get('file'), info })
        .catch(handleError)
    },
  },
  Query: {
    allCategories: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.Category.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['skillses'],
        }),
      }).catch(handleError)
    },
    category: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.Category.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['skillses'],
        }),
      })
        .then((category) => {
          throwError(!category, `Categoria com id ${id} não encontrado!`)
          return category
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createCategory: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.user = authUser.id
        return db.sequelize
          .transaction((t) => {
            throwError(
              authUser.role != 'ADMINA',
              `Não autorizado! Você não tem permissoes para isso!`
            )
            return db.Category.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updateCategory: compose(
      authResolvers,
      (parent, { id, input }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.Category.findById(id).then((category) => {
              throwError(!category, `Categoria com id ${id} não encontrado!`)
              throwError(
                authUser.role != 'ADMINA',
                `Não autorizado! Você não tem permissoes para isso!`
              )
              return category.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deleteCategory: compose(
      authResolvers,
      (parent, { id }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.Category.findById(id).then((category) => {
              throwError(!category, `Categoria com id ${id} não encontrado!`)
              throwError(
                authUser.role != 'ADMINA',
                `Não autorizado! Você não tem permissoes para isso!`
              )
              return category
                .destroy({ transaction: t })
                .then((category) => !!category)
            })
          })
          .catch(handleError)
      }
    ),
  },
}
