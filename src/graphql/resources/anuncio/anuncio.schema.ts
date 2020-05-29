const anuncioTypes = `

    type Anuncio {
        id: ID!
        createdAt: String!
        updatedAt: String
        active: Boolean
        description: String!
        files: [File!]!
        player: Player
        price: String
        proposes: [Propose!]!
        skills: Skills!
    }

    input AnuncioInput {
        active: Boolean
        description: String!
        files: String
        price: String
        proposes: ID!
        skills: ID!
    }

`;

const anuncioQueries = `
    allAnuncioes(first: Int, offset: Int): [ Anuncio! ]!
    anuncio(id: ID!): Anuncio
`;

const anuncioMutations = `
    createAnuncio(input: AnuncioInput!): Anuncio
    updateAnuncio(id: ID!, input: AnuncioInput!): Anuncio
    deleteAnuncio(id: ID!): Boolean
`;

export {
    anuncioTypes,
    anuncioQueries,
    anuncioMutations
}
