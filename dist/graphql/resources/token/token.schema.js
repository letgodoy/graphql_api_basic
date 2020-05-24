"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenTypes = `
    type Token {
        token: String!
    }
`;
exports.tokenTypes = tokenTypes;
const tokenMutations = `
    authUser(email: String!, password: String!): Token
`;
exports.tokenMutations = tokenMutations;
