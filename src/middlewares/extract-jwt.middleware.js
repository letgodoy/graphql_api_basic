import { User } from '../models/UserModel'

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/utils')

export function authUser(resolvers) {
  Object.keys(resolvers).forEach(k => {
    resolvers[k] = resolvers[k].wrapResolve(next => rp => {
      if (!rp.context.authUser) {
        throw new Error('Voce nao tem autorizacao para fazer isso.');
      }
      return next(rp);
    });
  });
  return resolvers;
}

export const extractJwt = ({ headers }) => new Promise( (resolve) => {
    const authorization = headers.authorization
    const token = authorization ? authorization.split(' ')[1] : undefined

    if (!headers.authorization) {
      return null
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        throw new Error("Token invalido")
      }

      await User.findById(decoded.sub).then((user) => {
        if (user) {
          resolve( {
            authorization,
            authUser: {
              id: user._id
            }
          })
        }
      })
    })
  })