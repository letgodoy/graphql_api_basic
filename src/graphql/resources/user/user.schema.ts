const userTypes = `

    # User definition type
    type User {
        id: ID!
        name: String!
        email: String!
        role: ROLE!
        createdAt: String!
        updatedAt: String!
        player: Player
    }

    enum ROLE {
        USER
        ADMIND
        ADMINA
      }

    input UserCreateInput {
        email: String!
        password: String!
        role: ROLE!
        player: ID
    }

    input UserUpdateInput {
        email: String!
        role: ROLE!
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