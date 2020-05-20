const playerTypes = `

    type Player {
        id: ID!
        createdAt: String!
        updatedAt: String

        address: Address @relation(name: "PlayerAddress")
        birthday: String
        chatsFrom: [Chat!]! @relation(name: "ChatFrom")
        chatsTo: [Chat!]! @relation(name: "ChatTo")
        commentsTo: [Comment!]! @relation(name: "CommentTo")
        commentsfrom: [Comment!]! @relation(name: "CommentFrom")
        description: String
        document: String
        email: String!
        name: String!
        notifications: [Notification!]! @relation(name: "NotificationPlayer")
        phone: String
        proposes: [Propose!]! @relation(name: "ProposeTo")
        proposesFrom: [Propose!]! @relation(name: "ProposeFrom")
        ranks: [Rank!]! @relation(name: "RankOnPlayer")
        status: Boolean
        type: TYPE!
        user: User @relation(name: "UserOnPlayer")
        anuncioses: [Anuncios!]! @relation(name: "AnunciosOnPlayer")
        phoneverif: Boolean
        photo: File @relation(name: "PlayerOnFile")
        ranksmaked: [Rank!]! @relation(name: "RankMakedOnPlayer")

    }

    enum TYPE {
        CLIENTE
        PROFISSIONAL
      }

    input PlayerInput {
        active: Boolean
        description: String!
        files: [File!]!
        player: Player
        price: String
        proposes: [Propose!]!
        skills: Skills
    }

`;

const playerQueries = `
    allPlayers(first: Int, offset: Int): [ Player! ]!
    player(id: ID!): Player
`;

const playerMutations = `
    createPlayer(input: PlayerInput!): Player
    updatePlayer(id: ID!, input: PlayerInput!): Player
    deletePlayer(id: ID!): Boolean
`;

export {
    playerTypes,
    playerQueries,
    playerMutations
}
