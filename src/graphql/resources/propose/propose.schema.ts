const proposeTypes = `

    type Propose {
        id: ID!
        createdAt: String!
        updatedAt: String

        date: String!
        dateEnd: String
        dateEndF: String
        dateInit: String!
        dateInitF: String
        description: String!
        skill: String
        status: String!
        timeEnd: String
        timeEndF: String
        timeInit: String
        timeInitF: String
        valueEnd: String
        valueInit: String
        aceite: Boolean!
        location: String
        locationF: String

        from: Player!
        to: Player!
        anuncio: Anuncio!

    }

    input ProposeInput {
        date: String!
        dateEnd: String
        dateEndF: String
        dateInit: String!
        dateInitF: String
        description: String!
        skill: String
        status: String!
        timeEnd: String
        timeEndF: String
        timeInit: String
        timeInitF: String
        valueEnd: String
        valueInit: String
        aceite: Boolean!
        location: String
        locationF: String

        to: Player!
        anuncio: Anuncios!
    }

`;

const proposeQueries = `
    allProposes(first: Int, offset: Int): [ Propose! ]!
    propose(id: ID!): Propose
`;

const proposeMutations = `
    createPropose(input: ProposeInput!): Propose
    updatePropose(id: ID!, input: ProposeInput!): Propose
    deletePropose(id: ID!): Boolean
`;

export {
    proposeTypes,
    proposeQueries,
    proposeMutations
}
