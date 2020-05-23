import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { Query } from './query';
import { Mutation } from './mutation';

import { commentTypes } from './resources/comment/comment.schema';
import { postTypes } from './resources/post/post.schema';
import { tokenTypes } from './resources/token/token.schema';
import { userTypes } from './resources/user/user.schema';

import { commentResolvers } from './resources/comment/comment.resolvers';
import { postResolvers } from './resources/post/post.resolvers';
import { tokenResolvers } from './resources/token/token.resolvers';
import { userResolvers } from './resources/user/user.resolvers';
import { addressResolvers } from './resources/address/address.resolvers';
import { anuncioResolvers } from './resources/anuncio/anuncio.resolvers';
import { categoryResolvers } from './resources/category/category.resolvers';
import { chatResolvers } from './resources/chat/chat.resolvers';
import { habilidadeResolvers } from './resources/habilidade/habilidade.resolvers';
import { newsResolvers } from './resources/news/news.resolvers';
import { notificationResolvers } from './resources/notifications/notifications.resolvers';
import { playerResolvers } from './resources/player/player.resolvers';
import { proposeResolvers } from './resources/propose/propose.resolvers';
import { rankResolvers } from './resources/rank/rank.resolvers';
import { skillsResolvers } from './resources/skills/skills.resolvers';
import { addressTypes } from './resources/address/address.schema';
import { anuncioTypes } from './resources/anuncio/anuncio.schema';
import { categoryTypes } from './resources/category/category.schema';
import { chatTypes } from './resources/chat/chats.schema';
import { habilidadeTypes } from './resources/habilidade/habilidade.schema';
import { newsTypes } from './resources/news/news.schema';
import { notificationTypes } from './resources/notifications/notifications.schema';
import { playerTypes } from './resources/player/player.schema';
import { proposeTypes } from './resources/propose/propose.schema';
import { rankTypes } from './resources/rank/rank.schema';
import { skillsTypes } from './resources/skills/skills.schema';

const resolvers = merge(
    commentResolvers,
    postResolvers,
    tokenResolvers,
    userResolvers,
    addressResolvers,
    anuncioResolvers,
    categoryResolvers,
    chatResolvers,
    habilidadeResolvers,
    newsResolvers,
    notificationResolvers,
    playerResolvers,
    proposeResolvers,
    rankResolvers,
    skillsResolvers
);

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        commentTypes,
        postTypes,
        tokenTypes,
        userTypes,
        addressTypes,
        anuncioTypes,
        categoryTypes,
        chatTypes,
        habilidadeTypes,
        newsTypes,
        notificationTypes,
        playerTypes,
        proposeTypes,
        rankTypes,
        skillsTypes
    ],
    resolvers
});