"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        player: Player!
    }

`;
exports.notificationTypes = notificationTypes;
const notificationQueries = `
    allNotifications(first: Int, offset: Int): [ Notification! ]!
    notification(id: ID!): Notification
`;
exports.notificationQueries = notificationQueries;
const notificationMutations = `
    createNotification(input: NotificationInput!): Notification
    updateNotification(id: ID!, input: NotificationInput!): Notification
    deleteNotification(id: ID!): Boolean
`;
exports.notificationMutations = notificationMutations;
