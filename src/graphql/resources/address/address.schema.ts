const addressTypes = `

    type Address {
        id: ID!
        createdAt: String!
        updatedAt: String!
        city: String
        complement: String
        country: String @defaultValue(value: "Brasil")
        id: ID! @isUnique
        neighborhood: String
        number: String
        player: Player @relation(name: "PlayerAddress")
        state: String
        street: String
        zipcode: String!
    }

    input AddressInput {
        city: String
        complement: String
        country: String @defaultValue(value: "Brasil")
        id: ID! @isUnique
        neighborhood: String
        number: String
        player: Player @relation(name: "PlayerAddress")
        state: String
        street: String
        zipcode: String!
    }

`;

const addressQueries = `
    allAddresses(first: Int, offset: Int): [ Post! ]!
    Address(id: ID!): Post
    commentsByPost(postId: ID!, first: Int, offset: Int): [ Comment! ]!
`;

const addressMutations = `
    createComment(input: CommentInput!): Comment
    updateComment(id: ID!, input: CommentInput!): Comment
    deleteComment(id: ID!): Boolean
`;

export {
    addressTypes,
    addressQueries,
    addressMutations
}
