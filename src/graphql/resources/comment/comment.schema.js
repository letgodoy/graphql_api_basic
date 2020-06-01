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
        to: PlayerInput
        propose: ProposeInput
    }

`

const commentQueries = `
    allComments(first: Int, offset: Int): [ Comment! ]!
    comment(id: ID!): Comment
`

const commentMutations = `
    createComment(input: CommentInput!): Comment
    updateComment(id: ID!, input: CommentInput!): Comment
    deleteComment(id: ID!): Boolean
`

module.exports = { commentTypes, commentQueries, commentMutations }
