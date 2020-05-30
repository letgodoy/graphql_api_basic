const playerTypes = `

    type Player {
        id: ID!
        createdAt: String!
        updatedAt: String

        address: Address
        birthday: String
        chatsFrom: [Chat!]!
        chatsTo: [Chat!]!
        commentsTo: [Comment!]!
        commentsfrom: [Comment!]!
        description: String
        document: String
        email: String!
        name: String!
        notifications: [Notification!]!
        phone: String!
        proposes: [Propose!]!
        proposesFrom: [Propose!]!
        ranks: [Rank!]!
        status: Boolean!
        type: TYPE!
        user: User!
        anuncioses: [Anuncio!]!
        phoneverif: Boolean!
        photo: File
        ranksmaked: [Rank!]!

    }

    enum TYPE {
        CLIENTE
        PROFISSIONAL
      }

    input PlayerInput {
        birthday: String
        description: String
        document: String
        email: String!
        name: String!
        phone: String!
        status: Boolean!
        type: TYPE!
        phoneverif: Boolean!
        photo: File
    }

`

const playerQueries = `
    allPlayers(first: Int, offset: Int): [ Player! ]!
    player(id: ID!): Player
`

const playerMutations = `
    createPlayer(input: PlayerInput!): Player
    updatePlayer(input: PlayerInput!): Player
    deletePlayer: Boolean
`

module.exports = { playerTypes, playerQueries, playerMutations }
