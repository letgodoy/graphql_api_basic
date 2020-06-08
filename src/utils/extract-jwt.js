import jwt from 'jsonwebtoken'
import { JWT_SECRET, handleError } from './utils'

//verifica se foi enviado o token no context
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

//verifica se o token é valido e adiciona o id e os models no context
// eslint-disable-next-line no-undef
export const extractJwt = ({ headers }, models) => new Promise((resolve, reject) => {
  const authorization = headers.authorization
  const token = authorization ? authorization.split(' ')[1] : undefined
  
  if (!headers.authorization) return { models }

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) handleError(err, "Token inválido")

      await models.User.findById(decoded.sub).then((user) => {
        if (user) {
          resolve({
            authUser: {
              id: user._id,
              role: user.role
            },
            models
          })
        }
      }).catch(err => reject(handleError(err, "Token inválido")))
    })
  }
})