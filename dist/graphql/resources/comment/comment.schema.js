"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commentTypes = `

    type Comment {
        id: ID!
        createdAt: String!
        updatedAt: String
        description: String!
        reply: String
        typeTo: TYPE!
        rating: RATING!

        from: Player!
        to: Player!
        propose: Propose!
    }

    enum RATING {
        POSITIVE
        NEUTRAL
        NEGATIVE
      }

    input CommentInput {
        description: String!
        reply: String
        typeTo: TYPE!
        rating: RATING!
        to: ID!
        propose: ID!
    }

`;
exports.commentTypes = commentTypes;
const commentQueries = `
    commentsByPost(postId: ID!, first: Int, offset: Int): [ Comment! ]!
`;
exports.commentQueries = commentQueries;
const commentMutations = `
    createComment(input: CommentInput!): Comment
    updateComment(id: ID!, input: CommentInput!): Comment
    deleteComment(id: ID!): Boolean
`;
exports.commentMutations = commentMutations;
