"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoryTypes = `

    type Category {
        id: ID!
        createdAt: String!
        updatedAt: String
        name: String!
        description: String
        image: String!
        user: User!
        skillses: [Skills!]!
    }

    input CategoryInput {
        name: String!
        description: String
        image: File!
        files: [File!]!
    }

`;
exports.categoryTypes = categoryTypes;
const categoryQueries = `
    allCategories(first: Int, offset: Int): [ Category! ]!
    category(id: ID!): Category
`;
exports.categoryQueries = categoryQueries;
const categoryMutations = `
    createCategory(input: CategoryInput!): Category
    updateCategory(id: ID!, input: CategoryInput!): Category
    deleteCategory(id: ID!): Boolean
`;
exports.categoryMutations = categoryMutations;
