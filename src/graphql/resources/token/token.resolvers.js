import jwt from 'jsonwebtoken'
import { JWT_SECRET, handleError } from '../../../utils/utils'
import bcryptjs from 'bcryptjs';

//gerar o token
export default {
  Mutation: {
    // eslint-disable-next-line no-undef
    authUser: async (parent, { email, password }, context) => await new Promise((resolve, reject) => {
      const errorMessage = 'Não autorizado, e-mail ou senha errados!'
      //se ja ta autenticado nao precisa gerar token.
      if (context.authUser) throw new Error("Você já está autenticado.")

      try {
        //verifica se existe o email digitado
        context.models.User.findOne({ email }).then(
          user =>
            user ?
              //compara a senha digitada, com a senha criptografada no banco. a senha digitada nao é criptografa
              bcryptjs.compare(password, user.password, (error, match) => {

                if (process.env.NODE_ENV === 'development') console.log('match password', match)

                if (error) handleError(error, errorMessage)

                if (match) {
                  const payload = { sub: user._id }
                  const token = jwt.sign(payload, JWT_SECRET)
                  resolve({ token })
                } else {
                  reject(handleError(error, errorMessage))
                  return null
                }
              })
              //achou ninguem
              : reject(handleError(user, errorMessage))
        ).catch(err => handleError(err, errorMessage))
      } catch {
        error => handleError(error, errorMessage)
      }
    })
  }
}
