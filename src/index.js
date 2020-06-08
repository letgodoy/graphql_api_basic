import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression'
import helmet from 'helmet'
import mongoose from 'mongoose';

import './utils/db';
import schema from './graphql/schema';
import models from './models'
import { extractJwt } from './utils/extract-jwt'
import { normalizePort, onError } from './utils/utils'

const port = normalizePort(process.env.PORT || 3000)
// eslint-disable-next-line no-undef
const host = process.env.HOST || '127.0.0.1'

dotenv.config();

const app = express();

//add os middlewares aqui
app.use(compression())
app.use(helmet())

const server = new ApolloServer({
  schema,
  cors: true,
  playground: process.env.NODE_ENV === 'development',
  introspection: true,
  tracing: true,
  path: '/graphql',
  //context de resolver o token enviado no header
  context: ({req}) => extractJwt(req, models),
});

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: true,

  onHealthCheck: () =>
  //conecta no banco
    // eslint-disable-next-line no-undef
    new Promise((resolve, reject) => {
      if (mongoose.connection.readyState > 0) {
        resolve();
      } else {
        reject();
      }
    }),

});

app.listen({ port, host }, () => {
  app.on('error', onError(app));
  console.log(`🚀 Server listening on port ${port}`);
  console.log(`😷 Health checks available at ${host}`);
  console.log(`Mode ${process.env.NODE_ENV}`);
});