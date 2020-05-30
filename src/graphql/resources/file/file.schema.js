const fileTypes = `

    type File {
        id: ID!
        createdAt: String!
        updatedAt: String
        name: String!
        url: String!
    }

    input FileInput {
        name: String!
        url: String!
    }

`

const fileQueries = `
    allFiles(first: Int, offset: Int): [ File! ]!
    file(id: ID!): File
`

const fileMutations = `
    createFile(input: FileInput!): File
    updateFile(input: FileInput!): File
    deleteFile: Boolean
`

module.exports = { fileTypes, fileQueries, fileMutations }
