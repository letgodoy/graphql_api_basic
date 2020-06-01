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
        category: CategoryInput!
    }

`

const skillsQueries = `
    allSkillses(first: Int, offset: Int): [ Skills! ]!
    skills(id: ID!): Skills
`

const skillsMutations = `
    createSkills(input: SkillsInput!): Skills
    updateSkills(id: ID!, input: SkillsInput!): Skills
    deleteSkills(id: ID!): Boolean
`

module.exports = { skillsTypes, skillsQueries, skillsMutations }
