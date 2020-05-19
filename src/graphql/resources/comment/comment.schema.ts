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
        comment: String!
        post: Int!
    }

`;

const commentQueries = `
    commentsByPost(postId: ID!, first: Int, offset: Int): [ Comment! ]!
`;

const commentMutations = `
    createComment(input: CommentInput!): Comment
    updateComment(id: ID!, input: CommentInput!): Comment
    deleteComment(id: ID!): Boolean
`;

export {
    commentTypes,
    commentQueries,
    commentMutations
}
