import dotenv from 'dotenv';
import express, { request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression'
import helmet from 'helmet'
import mongoose from 'mongoose';

import './utils/db';
import schema from './schema/index';
import { extractJwtMiddleware } from './middlewares/extract-jwt.middleware'
import { db } from './models'
import { normalizePort, onError } from './utils/utils'

const port = normalizePort(process.env.PORT || 3000)
// eslint-disable-next-line no-undef
const host = process.env.HOST || '127.0.0.1'

dotenv.config();

const app = express();

app.use(compression())
app.use(helmet())
app.use(extractJwtMiddleware())

const server = new ApolloServer({
  schema,
  cors: true,
  playground: process.env.NODE_ENV === 'development',
  introspection: true,
  tracing: true,
  path: '/graphql',
  context: {
    db,
    req: request,
  },
});

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: true,

  onHealthCheck: () =>
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
});