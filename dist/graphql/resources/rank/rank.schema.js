"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rankTypes = `

    type Rank {
        id: ID!
        createdAt: String!
        updatedAt: String
        media: Int
        agilidade: Int
        atendimento: Int
        custo: Int
        custoC: Int
        ferramentas: Int
        pontualidade: Int
        pontualidadeC: Int
        respeitoC: Int
        resposta: Int
        solucao: Int
        transparenciaC: Int
        typeTo: TYPE!

        from: Player!
        propose: Propose!
        player: Player!
    }

    input RankInput {
        media: Int
        agilidade: Int
        atendimento: Int
        custo: Int
        custoC: Int
        ferramentas: Int
        pontualidade: Int
        pontualidadeC: Int
        respeitoC: Int
        resposta: Int
        solucao: Int
        transparenciaC: Int
        typeTo: TYPE!

        propose: Propose!
        player: Player!
    }

`;
exports.rankTypes = rankTypes;
const rankQueries = `
    allRanks(first: Int, offset: Int): [ Rank! ]!
    rank(id: ID!): Rank
`;
exports.rankQueries = rankQueries;
const rankMutations = `
    createRank(input: RankInput!): Rank
    updateRank(id: ID!, input: RankInput!): Rank
    deleteRank(id: ID!): Boolean
`;
exports.rankMutations = rankMutations;
