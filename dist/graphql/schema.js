"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const lodash_1 = require("lodash");
const query_1 = require("./query");
const mutation_1 = require("./mutation");
const comment_schema_1 = require("./resources/comment/comment.schema");
const post_schema_1 = require("./resources/post/post.schema");
const token_schema_1 = require("./resources/token/token.schema");
const user_schema_1 = require("./resources/user/user.schema");
const comment_resolvers_1 = require("./resources/comment/comment.resolvers");
const post_resolvers_1 = require("./resources/post/post.resolvers");
const token_resolvers_1 = require("./resources/token/token.resolvers");
const user_resolvers_1 = require("./resources/user/user.resolvers");
const address_resolvers_1 = require("./resources/address/address.resolvers");
const anuncio_resolvers_1 = require("./resources/anuncio/anuncio.resolvers");
const category_resolvers_1 = require("./resources/category/category.resolvers");
const chat_resolvers_1 = require("./resources/chat/chat.resolvers");
const habilidade_resolvers_1 = require("./resources/habilidade/habilidade.resolvers");
const news_resolvers_1 = require("./resources/news/news.resolvers");
const notifications_resolvers_1 = require("./resources/notifications/notifications.resolvers");
const player_resolvers_1 = require("./resources/player/player.resolvers");
const propose_resolvers_1 = require("./resources/propose/propose.resolvers");
const rank_resolvers_1 = require("./resources/rank/rank.resolvers");
const skills_resolvers_1 = require("./resources/skills/skills.resolvers");
const address_schema_1 = require("./resources/address/address.schema");
const anuncio_schema_1 = require("./resources/anuncio/anuncio.schema");
const category_schema_1 = require("./resources/category/category.schema");
const chats_schema_1 = require("./resources/chat/chats.schema");
const habilidade_schema_1 = require("./resources/habilidade/habilidade.schema");
const news_schema_1 = require("./resources/news/news.schema");
const notifications_schema_1 = require("./resources/notifications/notifications.schema");
const player_schema_1 = require("./resources/player/player.schema");
const propose_schema_1 = require("./resources/propose/propose.schema");
const rank_schema_1 = require("./resources/rank/rank.schema");
const skills_schema_1 = require("./resources/skills/skills.schema");
const resolvers = lodash_1.merge(comment_resolvers_1.commentResolvers, post_resolvers_1.postResolvers, token_resolvers_1.tokenResolvers, user_resolvers_1.userResolvers, address_resolvers_1.addressResolvers, anuncio_resolvers_1.anuncioResolvers, category_resolvers_1.categoryResolvers, chat_resolvers_1.chatResolvers, habilidade_resolvers_1.habilidadeResolvers, news_resolvers_1.newsResolvers, notifications_resolvers_1.notificationResolvers, player_resolvers_1.playerResolvers, propose_resolvers_1.proposeResolvers, rank_resolvers_1.rankResolvers, skills_resolvers_1.skillsResolvers);
const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;
exports.default = graphql_tools_1.makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        query_1.Query,
        mutation_1.Mutation,
        comment_schema_1.commentTypes,
        post_schema_1.postTypes,
        token_schema_1.tokenTypes,
        user_schema_1.userTypes,
        address_schema_1.addressTypes,
        anuncio_schema_1.anuncioTypes,
        category_schema_1.categoryTypes,
        chats_schema_1.chatTypes,
        habilidade_schema_1.habilidadeTypes,
        news_schema_1.newsTypes,
        notifications_schema_1.notificationTypes,
        player_schema_1.playerTypes,
        propose_schema_1.proposeTypes,
        rank_schema_1.rankTypes,
        skills_schema_1.skillsTypes
    ],
    resolvers
});
