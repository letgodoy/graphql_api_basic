const playerTypes = `

    type Player {
        id: ID!
        createdAt: String!
        updatedAt: String

        address: Address
        birthday: String
        chatsFrom: [Chat!]! @relation(name: "ChatFrom")
        chatsTo: [Chat!]! @relation(name: "ChatTo")
        commentsTo: [Comment!]! @relation(name: "CommentTo")
        commentsfrom: [Comment!]! @relation(name: "CommentFrom")
        description: String
        document: String
        email: String!
        name: String!
        notifications: [Notification!]!
        phone: String!
        proposes: [Propose!]! @relation(name: "ProposeTo")
        proposesFrom: [Propose!]! @relation(name: "ProposeFrom")
        ranks: [Rank!]! @relation(name: "RankOnPlayer")
        status: Boolean!
        type: TYPE!
        user: User!
        anuncioses: [Anuncios!]!
        phoneverif: Boolean!
        photo: String
        ranksmaked: [Rank!]! @relation(name: "RankMakedOnPlayer")

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
        photo: String
    }

`;

const playerQueries = `
    allPlayers(first: Int, offset: Int): [ Player! ]!
    player(id: ID!): Player
`;

const playerMutations = `
    createPlayer(input: PlayerInput!): Player
    updatePlayer(input: PlayerInput!): Player
    deletePlayer: Boolean
`;

export {
    playerTypes,
    playerQueries,
    playerMutations
}
