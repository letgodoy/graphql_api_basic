const categoryTypes = `

    type Category {
        id: ID!
        createdAt: String!
        updatedAt: String
        name: String!
        description: String
        image: String!
        user: User
        skillses: [Skills!]!
    }

    input CategoryInput {
        name: String!
        description: String
        image: String!
    }

`;

const categoryQueries = `
    allCategories(first: Int, offset: Int): [ Category! ]!
    category(id: ID!): Category
`;

const categoryMutations = `
    createCategory(input: CategoryInput!): Category
    updateCategory(id: ID!, input: CategoryInput!): Category
    deleteCategory(id: ID!): Boolean
`;

export {
    categoryTypes,
    categoryQueries,
    categoryMutations
}
