"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_schema_1 = require("./resources/comment/comment.schema");
const post_schema_1 = require("./resources/post/post.schema");
const user_schema_1 = require("./resources/user/user.schema");
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
const Query = `
    type Query {
        ${comment_schema_1.commentQueries}
        ${post_schema_1.postQueries}
        ${user_schema_1.userQueries}
        ${address_schema_1.addressQueries}
        ${anuncio_schema_1.anuncioQueries}
        ${category_schema_1.categoryQueries}
        ${chats_schema_1.chatQueries}
        ${comment_schema_1.commentQueries}
        ${habilidade_schema_1.habilidadeQueries}
        ${news_schema_1.newsQueries}
        ${notifications_schema_1.notificationQueries}
        ${player_schema_1.playerQueries}
        ${propose_schema_1.proposeQueries}
        ${rank_schema_1.rankQueries}
        ${skills_schema_1.skillsQueries}
        
    }
`;
exports.Query = Query;
