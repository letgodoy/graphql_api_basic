const jwt = require('jsonwebtoken')
const { JWT_SECRET, handleError } = require('../utils/utils')
import { schemaComposer } from 'graphql-compose';
import '../utils/db';
import { User } from '../models/UserModel';
import bcryptjs from 'bcryptjs';

export const TokenType = `
type Token {
  token: String!
}`

// const TokenTC = schemaComposer.createObjectTC(TokenType)

export const userSinginResolver = schemaComposer.createResolver({
  name: 'userSingin',
  type: TokenType,
  args: { email: 'String', password: 'String' },
  kind: 'mutation',
  resolve: async ({args, context}) => {
    const errorMessage = 'Não autorizado, e-mail ou senha errados!'
    if (context.authUser) throw new Error("Você já está autenticado.")
    return new Promise( async (resolve, reject) => {
      try {
        const user = await User.findOne({ email: args.email })

        // eslint-disable-next-line no-undef

        if (user) {
          bcryptjs.compare(args.password, user.password, (error, match) => {

            if (process.env.NODE_ENV === 'development') console.log('match password', match)

            if (error) handleError(error, errorMessage)

            if (match) {
              const payload = { sub: user._id }
              const token = jwt.sign(payload, JWT_SECRET)
              const res = {token}
              // return res
              resolve(res)
            } else {
              handleError(error, errorMessage)
            }
          })

        } else {
          console.log('acho ninguem')
          throw new Error(errorMessage)
        }
      } catch {
        error => {
          handleError(error, errorMessage)
        }
      }
    })
  },
  projection: { token: true },
})

export const userSingin = {
  userSingin: userSinginResolver
}