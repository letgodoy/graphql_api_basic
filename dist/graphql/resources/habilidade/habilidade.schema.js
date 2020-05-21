"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.habilidadeTypes = habilidadeTypes;
const habilidadeQueries = `
    allCategories(first: Int, offset: Int): [ Habilidade! ]!
    habilidade(id: ID!): Habilidade
`;
exports.habilidadeQueries = habilidadeQueries;
const habilidadeMutations = `
    createHabilidade(input: HabilidadeInput!): Habilidade
    updateHabilidade(id: ID!, input: HabilidadeInput!): Habilidade
    deleteHabilidade(id: ID!): Boolean
`;
exports.habilidadeMutations = habilidadeMutations;
