
import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';

schemaComposer.Query.addFields({
    ...UserQuery,
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
});

export default schemaComposer.buildSchema();