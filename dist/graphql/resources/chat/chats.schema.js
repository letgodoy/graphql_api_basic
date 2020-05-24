"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatTypes = `

    type Chat {
        id: ID!
        createdAt: String!
        updatedAt: String
        description: String!
        status: Boolean!
        date: String!
        from: Player!
        to: Player!
        propose: Propose!
    }

    input ChatInput {
        description: String!
        status: Boolean!
        date: String!
        to: ID!
        propose: ID!
    }

`;
exports.chatTypes = chatTypes;
const chatQueries = `
    allChats(first: Int, offset: Int): [ Chat! ]!
    chat(id: ID!): Chat
`;
exports.chatQueries = chatQueries;
const chatMutations = `
    createChat(input: ChatInput!): Chat
    updateChat(id: ID!, input: ChatInput!): Chat
    deleteChat(id: ID!): Boolean
`;
exports.chatMutations = chatMutations;
