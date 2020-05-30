const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  Query: {
    allFiles: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.File.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, { keep: ['id'] }),
      }).catch(handleError)
    },
    file: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.File.findById(id, {
        attributes: context.requestedFields.getFields(info, { keep: ['id'] }),
      })
        .then((file) => {
          throwError(!file, `Perfil com id ${id} não encontrado!`)
          return file
        })
        .catch(handleError)
    },
  },
  Mutation: {
    createFile: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        input.user = authUser.id
        return db.sequelize
          .transaction((t) => {
            return db.File.create(input, { transaction: t })
          })
          .catch(handleError)
      }
    ),
    updateFile: compose(
      authResolvers,
      (parent, { id, input }, { db, authUser }) => {
        // id = parseInt(id);
        return db.sequelize
          .transaction((t) => {
            return db.File.findById(id).then((file) => {
              throwError(!file, `File com id ${id} não encontrado!`)
              throwError(
                file.get('user') != authUser.id,
                `Não autorizado! Você só pode alterar seus proprios Perfil!`
              )
              return file.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    deleteFile: compose(authResolvers, (parent, args, { db, authUser }) => {
      // id = parseInt(id);
      return db.sequelize
        .transaction((t) => {
          return db.File.findById(authUser.player).then((file) => {
            throwError(
              !file,
              `Perfil com id ${authUser.player} não encontrado!`
            )
            throwError(
              file.get('user') != authUser.id,
              `Não autorizado! Você só pode alterar seus proprios Perfil!`
            )
            return file.destroy({ transaction: t }).then((file) => !!file)
          })
        })
        .catch(handleError)
    }),
  },
}
