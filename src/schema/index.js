
import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { userSingin } from './token'
import { AddressQuery, AddressMutation } from './address';


schemaComposer.Query.addFields({
    ...UserQuery,
    ...userSingin,
    ...AddressQuery
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...userSingin,
    ...AddressMutation
});

export default schemaComposer.buildSchema();