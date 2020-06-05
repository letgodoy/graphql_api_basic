const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/utils')
import { schemaComposer } from 'graphql-compose';


export const userSingin = schemaComposer.createResolver({
    name: 'singIn',
    args: { email: 'String', password: 'String' },
    resolve: async ({ source, args, context }) => {
    //   const res = await fetch(`/endpoint/${args.id}`); // or some fetch from any database
    //   const data = await res.json();

      const errorMessage = 'Não autorizado, e-mail ou senha errados!'
      if (context.authUser) throw new Error(errorMessage)
      
      try {
        const user = await User.findOne({ email: args.email }).exec();

        if (!user) {
          user.comparePassword(args.password, (error, match) => {
            if (!match) throw new Error(errorMessage)
            if (error) throw new Error(errorMessage)
            const payload = { sub: user._id }
            return {
              token: jwt.sign(payload, JWT_SECRET),
            }
          });
        } else {
          throw new Error(errorMessage)
        }
      } catch {
        error => {
          throw new Error(errorMessage)
        }
      }
    },
  });