import { handleError } from '../../../utils/utils'
import compose from '../../composable/composable.resolver'
import { authUser } from '../../../utils/extract-jwt'

export default {
  Address: {
    user: async (address, args, context) => await context.models.User.findById(address.userId)
    .populate('user')
    .catch(err => handleError(err, "Erro ao consultar o banco")),
  },

  Query: {
    allAddresses: async (parent, args, context) => await context.models.Address.find().catch(handleError),
    
    address: async (parent, args, context) => await context.models.Address.findById(args.id)
    .then(address => !address ? handleError(address, "Usuário não encontrado!") : address)
    .catch(err => handleError(err, "Erro ao comunicar com o banco.")),
  },

  Mutation: {
    createAddress: compose(authUser)(async (parent, args, context) => {
      //add automaticamente o usuario logado. o front nao precisa enviar o id
      args.input.userId = context.authUser.id
      const address = new context.models.Address(args.input)
      return await address.save().catch(err => handleError(err, "Erro ao comunicar com o banco."))
    }),

    updateAddress:  compose(authUser)(async (parent, { input }, context) =>
    //só atualiza o address que pertence ao usuario logado.
    //no caso é 1:1 entao só encontra um. caso nao da pra adicionar o id do address para buscar
    await context.models.Address.findByOneAndUpdate({ userId: context.authUser.id }, { $set: input }, { new: true })
      .then((data) => data ? data : handleError(data, "Erro ao atualizar os dados")).catch(err => handleError(err, "Erro ao comunicar com o banco."))
  ),
  
    deleteAddress: compose(authUser)(async (parent, args, context) =>
      await context.models.User.findByOneAndRemove({ userId: context.authUser.id})
        .then((data) => data ? true : false).catch(err => handleError(err, "Erro ao comunicar com o banco."))
    ),
  },
}
