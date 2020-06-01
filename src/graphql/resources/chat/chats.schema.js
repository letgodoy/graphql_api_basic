const chatTypes = `

    type Chat {
        id: ID!
        createdAt: String!
        updatedAt: String
        description: String!
        status: Boolean!
        date: String!
        from: Player!
        to: Player!
        propose: Propose!
    }

    input ChatInput {
        description: String!
        status: Boolean!
        date: String!
        to: PlayerInput!
        propose: ProposeInput!
    }

`

const chatQueries = `
    allChats(first: Int, offset: Int): [ Chat! ]!
    chat(id: ID!): Chat
`

const chatMutations = `
    createChat(input: ChatInput!): Chat
    updateChat(id: ID!, input: ChatInput!): Chat
    deleteChat(id: ID!): Boolean
`

module.exports = { chatTypes, chatQueries, chatMutations }
