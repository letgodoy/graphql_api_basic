const postTypes = `

    type Post {
        id: ID!
        title: String!
        content: String!
        file: File
        thumbnail: File
        published: Boolean!
        categoria: String
        user: User!
        cretedAt: String!
        updatedAt: String
    }

    input PostInput {
        title: String!
        content: String!
        file: File
        thumbnail: File
        published: Boolean!
        categoria: String
    }

`

const postQueries = `
    posts(first: Int, offset: Int): [ Post! ]!
    post(id: ID!): Post
`

const postMutations = `
    createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): Boolean
`

module.exports = { postTypes, postQueries, postMutations }
