"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skillsTypes = `

    type Skills {
        id: ID!
        createdAt: String!
        updatedAt: String
        name: String!
        category: Category!
        user: User!
    }

    input SkillsInput {
        name: String!
        category: Category!
    }

`;
exports.skillsTypes = skillsTypes;
const skillsQueries = `
    allSkillses(first: Int, offset: Int): [ Skills! ]!
    skills(id: ID!): Skills
`;
exports.skillsQueries = skillsQueries;
const skillsMutations = `
    createSkills(input: SkillsInput!): Skills
    updateSkills(id: ID!, input: SkillsInput!): Skills
    deleteSkills(id: ID!): Boolean
`;
exports.skillsMutations = skillsMutations;
