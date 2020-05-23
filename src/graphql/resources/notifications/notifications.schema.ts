const notificationTypes = `

    type Notification {
        id: ID!
        createdAt: String!
        updatedAt: String
        description: String
        status: Boolean!
        date: String!
        link: String
        player: Player!
    }

    input NotificationInput {
        description: String
        status: Boolean!
        date: String!
        link: String
    }

`;

const notificationQueries = `
    allNotifications(first: Int, offset: Int): [ Notification! ]!
    notification(id: ID!): Notification
`;

const notificationMutations = `
    createNotification(input: NotificationInput!): Notification
    updateNotification(id: ID!, input: NotificationInput!): Notification
    deleteNotification(id: ID!): Boolean
`;

export {
    notificationTypes,
    notificationQueries,
    notificationMutations
}
