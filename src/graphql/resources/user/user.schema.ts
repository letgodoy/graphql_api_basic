const userTypes = `

    # User definition type
    type User {
        id: ID!
        name: String!
        email: String!
        role: String!
        createdAt: String!
        updatedAt: String!
        player: Player
    }

    input UserCreateInput {
        email: String!
        password: String!
        role: String!
        player: Player
    }

    input UserUpdateInput {
        email: String!
        role: String!
    }

    input UserUpdatePasswordInput {
        password: String!
    }

`;

const userQueries = `
    users(first: Int, offset: Int): [ User! ]!
    user(id: ID!): User
    currentUser: User
`;

const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    updateUserPassword(input: UserUpdatePasswordInput!): Boolean
    deleteUser: Boolean
`;

export {
    userTypes,
    userQueries,
    userMutations
}