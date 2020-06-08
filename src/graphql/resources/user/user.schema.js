export const userTypes = `

    type User {
        id: ID!
        name: String!
        email: String!
        role: ROLE!
        createdAt: String!
        updatedAt: String!
        birthday: String
        type: TYPE!
        phoneverif: Boolean!
        address: Address
    }

    enum TYPE {
        CLIENTE
        PROFISSIONAL
      }

    enum ROLE {
        USER
        ADMIND
        ADMINA
      }

    input UserCreateInput {
        email: String!
        password: String!
        role: ROLE
        birthday: String
        description: String
        document: String
        name: String!
        phone: String!
        status: Boolean
        type: TYPE
        phoneverif: Boolean
        address: AddressInput
    }

    input UserUpdateInput {
        email: String
        role: ROLE
        birthday: String
        description: String
        document: String
        name: String
        phone: String
        status: Boolean
        type: TYPE
        phoneverif: Boolean
    }
`

export const userQueries = `
    allUsers(filter: User): [ User! ]!
    user(id: ID!): User
    currentUser: User
`

export const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    updateUserPassword(password: String!): Boolean
    recoverUserPassword(email: String!, password: String!): Boolean
    deleteUser: Boolean
`
