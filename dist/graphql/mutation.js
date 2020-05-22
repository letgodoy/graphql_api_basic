"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_schema_1 = require("./resources/comment/comment.schema");
const post_schema_1 = require("./resources/post/post.schema");
const token_schema_1 = require("./resources/token/token.schema");
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
const Mutation = `
    type Mutation {
        ${comment_schema_1.commentMutations}
        ${post_schema_1.postMutations}
        ${token_schema_1.tokenMutations}
        ${user_schema_1.userMutations}
        ${address_schema_1.addressMutations}
        ${anuncio_schema_1.anuncioMutations}
        ${category_schema_1.categoryMutations}
        ${chats_schema_1.chatMutations}
        ${habilidade_schema_1.habilidadeMutations}
        ${news_schema_1.newsMutations}
        ${notifications_schema_1.notificationMutations}
        ${player_schema_1.playerMutations}
        ${propose_schema_1.proposeMutations}
        ${rank_schema_1.rankMutations}
        ${skills_schema_1.skillsMutations}
        
    }
`;
exports.Mutation = Mutation;
