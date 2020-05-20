const newsTypes = `

    type News {
        id: ID!
        createdAt: String!
        updatedAt: String
        name: String!
        logo: String!
        link: String!
        user: User!
    }

    input NewsInput {
        name: String!
        logo: String!
        link: String!
    }

`;

const newsQueries = `
    allNews(first: Int, offset: Int): [ News! ]!
    news(id: ID!): News
`;

const newsMutations = `
    createNews(input: NewsInput!): News
    updateNews(id: ID!, input: NewsInput!): News
    deleteNews(id: ID!): Boolean
`;

export {
    newsTypes,
    newsQueries,
    newsMutations
}
