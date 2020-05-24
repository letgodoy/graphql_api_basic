"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.userTypes = userTypes;
const userQueries = `
    users(first: Int, offset: Int): [ User! ]!
    user(id: ID!): User
    currentUser: User
`;
exports.userQueries = userQueries;
const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    updateUserPassword(input: UserUpdatePasswordInput!): Boolean
    recoverUserPassword(id: ID!, input: UserUpdatePasswordInput!): Boolean
    deleteUser: Boolean
`;
exports.userMutations = userMutations;
