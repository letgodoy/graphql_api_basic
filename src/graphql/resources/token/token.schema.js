export const tokenTypes = `
    type Token {
        token: String!
    }
`

export const tokenMutations = `
    authUser(email: String!, password: String!): Token
`
