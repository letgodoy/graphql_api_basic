const { handleError, throwError } = require('../../../utils/utils')
const compose = require('../../composable/composable.resolver')
const { authResolvers } = require('../../composable/auth.resolver')

module.exports = {
  User: {
    // address: (user, args, { dataloaders: { addressLoader } }, info) => {
    //   console.log('user', user)
    //   console.log('loader', addressLoader)
    //   return addressLoader
    //     .load({ key: user.get('address'), info })
    //     .catch(handleError)
    // },
    address: (user, args, { db, requestedFields }, info) => {
      console.log(user)
      return db.Address.findAll({
        where: { user: user.get('id') },
        attributes: requestedFields.getFields(info, {
          keep: ['id'],
        }),
      }).catch(handleError)
    },
  },

  Query: {
    allUsers: (
      parent,
      { first = 50, offset = 0 },
      { db, requestedFields },
      info
    ) => {
      console.log(info)
      return db.User.findAll({
        // limit: first,
        // offset: offset,
        // attributes: requestedFields.getFields(info, {
        //   keep: ['id'],
        // }),
      }).catch(handleError)
    },
    user: (parent, { id }, { db, requestedFields }, info) => {
      return db.User.findByPk(id, {
        attributes: requestedFields.getFields(info, {
          keep: ['id'],
        }),
      })
        .then((user) => {
          throwError(!user, `Usuário com id ${id} não encontrado!`)
          return user
        })
        .catch(handleError)
    },
    currentUser: compose(authResolvers, (parent, args, context, info) => {
      return context.db.User.findByPk(context.authUser.id, {
        attributes: context.requestedFields.getFields(info, {
          keep: ['id'],
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
            return db.User.findByPk(authUser.id).then((user) => {
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
            return db.User.findByPk(authUser.id).then((user) => {
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
          return db.User.findByPk(id).then((user) => {
            throwError(!user, `Usuário com id ${id} não encontrado!`)
            return user.update(input, { transaction: t }).then((user) => !!user)
          })
        })
        .catch(handleError)
    },
    deleteUser: compose(authResolvers, (parent, args, { db, authUser }) => {
      return db.sequelize
        .transaction((t) => {
          return db.User.findByPk(authUser.id).then((user) => {
            throwError(!user, `Usuário com id ${authUser.id} não encontrado!`)
            return user.destroy({ transaction: t }).then((user) => !!user)
          })
        })
        .catch(handleError)
    }),
  },
}

// mutation {
//   createUser (input: {
//     name: "name"
//     email: "email"
//     password: "password"
//     role: USER
//     type: CLIENTE
//     phone: "12313213"
//     status: true
//     phoneverif: false
//   }){
//     email
//   }
// }

// mutation {
//   authUser (
//     email: "email"
//     password: "password"
//   ){
//     token
//   }
// }

// mutation {
//   createAddress (input: {
//     zipcode: "132465"
//     street: "street"
//     city: "city"
//     state: "state"
//   }){
//     street
//   }
// }

// query {
//   allUsers {
//     name
//     address {
//       street
//     }
//   }
// }
