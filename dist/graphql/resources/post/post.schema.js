"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postTypes = `

    type Post {
        id: ID!
        title: String!
        content: String!
        file: String!
        thumbnail: String!
        published: Boolean!
        categoria: String
        user: User!
        cretedAt: String!
        updatedAt: String
    }

    input PostInput {
        title: String!
        content: String!
        file: String!
        thumbnail: String!
        published: Boolean!
        categoria: String
    }

`;
exports.postTypes = postTypes;
const postQueries = `
    posts(first: Int, offset: Int): [ Post! ]!
    post(id: ID!): Post
`;
exports.postQueries = postQueries;
const postMutations = `
    createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): Boolean
`;
exports.postMutations = postMutations;
