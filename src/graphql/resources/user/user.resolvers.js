import { handleError } from '../../../utils/utils'
import compose from '../../composable/composable.resolver'
import { authUser } from '../../../utils/extract-jwt'

//compose(authUser)(function) serve para funcoes que precisao de autorizacao.
//context.authUser.role usa para regras de tipos de usuario. ex. User, Admin

export default {
  User: {
    address: (user, args, { models }) => models.Address.findOne({ userId: user.id })
      .populate('address')
      .catch(err => handleError(err, "Erro ao consultar o banco")),
  },

  Query: {
    allUsers: async (parent, args, context) => await context.models.User.find(),

    user: async (parent, args, context) => await context.models.User.findById(args.id)
      .then(user => !user ? handleError(user, "Usuário não encontrado!") : user)
      .catch(err => handleError(err, "Erro ao comunicar com o banco.")),

    currentUser: compose(authUser)(async (parent, args, context) => await context.models.User.findById(context.authUser.id)
      .then(user => !user ? handleError(user, "Usuário não encontrado!") : user)
      .catch(err => handleError(err, "Erro ao comunicar com o banco."))),
  },

  Mutation: {
    createUser: async (parent, args, context) => {
      const user = new context.models.User(args.input)
      return await user.save().catch(err => handleError(err, "Erro ao comunicar com o banco."))
    },

    updateUser: compose(authUser)(async (parent, { input }, context) =>
      await context.models.User.findByIdAndUpdate(context.authUser.id, { $set: input }, { new: true })
        .then((data) => data ?
          { success: true, data }
          : handleError(data, "Usuario inválido.")
        ).catch(err => handleError(err, "Erro ao comunicar com o banco."))
    ),

    updateUserPassword: compose(authUser)(async (parent, { password }, context) =>
      await context.models.User.findByIdAndUpdate(context.authUser.id, { $set: { password } }, { new: true })
        .then((data) => data ? true : false).catch(err => handleError(err, "Erro ao comunicar com o banco."))
    ),

    recoverUserPassword: async (parent, { email, password }, context) =>
      await context.models.User.findByOneAndUpdate({ email }, { $set: { password } }, { new: true })
        .then((data) => data ? true : false).catch(err => handleError(err, "Erro ao comunicar com o banco.")),

    deleteUser: compose(authUser)(async (parent, args, context) =>
      await context.models.User.findByIdAndRemove(context.authUser.id)
        .then((data) => data ? true : false).catch(err => handleError(err, "Erro ao comunicar com o banco."))
    ),
  },
}