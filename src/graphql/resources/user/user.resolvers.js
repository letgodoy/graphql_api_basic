const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  User: {
    player: (
      user,
      { first = 50, offset = 0 },
      { db, requestedFields },
      info
    ) => {
      return db.Player.findAll({
        where: { user: user.get('id') },
        limit: first,
        offset: offset,
        attributes: requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['user'],
        }),
      }).catch(handleError)
    },
  },
  Query: {
    users: (parent, { first = 50, offset = 0 }, context, info) => {
      return context.db.User.findAll({
        limit: first,
        offset: offset,
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['user'],
        }),
      }).catch(handleError)
    },
    user: (parent, { id }, context, info) => {
      id = parseInt(id)
      return context.db.User.findById(id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['user'],
        }),
      })
        .then((user) => {
          throwError(!user, `Usuário com id ${id} não encontrado!`)
          return user
        })
        .catch(handleError)
    },
    currentUser: compose(authResolvers, (parent, args, context, info) => {
      return context.db.User.findById(context.authUser.id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
          exclude: ['user'],
        }),
      })
        .then((user) => {
          throwError(
            !user,
            `Usuário com id ${context.authUser.id} não encontrado!`
          )
          return user
        })
        .catch(handleError)
    }),
  },
  Mutation: {
    createUser: (parent, { input }, { db }) => {
      return db.sequelize
        .transaction((t) => {
          return db.User.create(input, { transaction: t })
        })
        .catch(handleError)
    },
    updateUser: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        return db.sequelize
          .transaction((t) => {
            return db.User.findById(authUser.id).then((user) => {
              throwError(!user, `Usuário com id ${authUser.id} não encontrado!`)
              return user.update(input, { transaction: t })
            })
          })
          .catch(handleError)
      }
    ),
    updateUserPassword: compose(
      authResolvers,
      (parent, { input }, { db, authUser }) => {
        return db.sequelize
          .transaction((t) => {
            return db.User.findById(authUser.id).then((user) => {
              throwError(!user, `Usuário com id ${authUser.id} não encontrado!`)
              return user
                .update(input, { transaction: t })
                .then((user) => !!user)
            })
          })
          .catch(handleError)
      }
    ),
    recoverUserPassword: (parent, { id, input }, { db }) => {
      return db.sequelize
        .transaction((t) => {
          return db.User.findById(id).then((user) => {
            throwError(!user, `Usuário com id ${id} não encontrado!`)
            return user.update(input, { transaction: t }).then((user) => !!user)
          })
        })
        .catch(handleError)
    },
    deleteUser: compose(authResolvers, (parent, args, { db, authUser }) => {
      return db.sequelize
        .transaction((t) => {
          return db.User.findById(authUser.id).then((user) => {
            throwError(!user, `Usuário com id ${authUser.id} não encontrado!`)
            return user.destroy({ transaction: t }).then((user) => !!user)
          })
        })
        .catch(handleError)
    }),
  },
}
