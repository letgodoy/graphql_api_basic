const userTypes = `

    type User {
        id: ID!
        name: String!
        email: String!
        role: ROLE!
        createdAt: String!
        updatedAt: String!
        birthday: String
        chatsFrom: [Chat!]!
        chatsTo: [Chat!]!
        commentsTo: [Comment!]!
        commentsfrom: [Comment!]!
        description: String
        document: String
        notifications: [Notification!]!
        phone: String!
        proposes: [Propose!]!
        proposesFrom: [Propose!]!
        ranks: [Rank!]!
        status: Boolean!
        type: TYPE!
        anuncioses: [Anuncio!]!
        phoneverif: Boolean!
        photo: File
        ranksmaked: [Rank!]!
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
        role: ROLE!
        birthday: String
        description: String
        document: String
        name: String!
        phone: String!
        status: Boolean!
        type: TYPE!
        phoneverif: Boolean!
        photo: FileInput
        address: AddressInput
    }

    input UserUpdateInput {
        email: String!
        role: ROLE!
        birthday: String
        description: String
        document: String
        name: String!
        phone: String!
        status: Boolean!
        type: TYPE!
        phoneverif: Boolean!
        photo: FileInput
    }

    input UserUpdatePasswordInput {
        password: String!
    }

`

const userQueries = `
    allUsers(first: Int, offset: Int): [ User! ]!
    user(id: ID!): User
    currentUser: User
`

const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    updateUserPassword(input: UserUpdatePasswordInput!): Boolean
    recoverUserPassword(id: ID!, input: UserUpdatePasswordInput!): Boolean
    deleteUser: Boolean
`

module.exports = { userTypes, userQueries, userMutations }
