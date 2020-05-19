const habilidadeTypes = `

    type Habilidade {
        id: ID!
        createdAt: String!
        updatedAt: String
        name: String!
        cadastro: Boolean!
        player: Player!
    }

    input HabilidadeInput {
        name: String!
        cadastro: Boolean!
    }

`;

const habilidadeQueries = `
    allCategories(first: Int, offset: Int): [ Habilidade! ]!
    habilidade(id: ID!): Habilidade
`;

const habilidadeMutations = `
    createHabilidade(input: HabilidadeInput!): Habilidade
    updateHabilidade(id: ID!, input: HabilidadeInput!): Habilidade
    deleteHabilidade(id: ID!): Boolean
`;

export {
    habilidadeTypes,
    habilidadeQueries,
    habilidadeMutations
}
