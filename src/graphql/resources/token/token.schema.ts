const tokenTypes = `
    type Token {
        token: String!
    }
`;

const tokenMutations = `
    authUser(email: String!, password: String!): Token
`;

export {
    tokenTypes,
    tokenMutations
}