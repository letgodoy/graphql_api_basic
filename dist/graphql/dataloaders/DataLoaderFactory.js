"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataLoader = require("dataloader");
const UserLoader_1 = require("./UserLoader");
const PostLoader_1 = require("./PostLoader");
const playerLoader_1 = require("./playerLoader");
const SkillsLoader_1 = require("./SkillsLoader");
const NotificationLoader_1 = require("./NotificationLoader");
const AnuncioLoader_1 = require("./AnuncioLoader");
const AddressLoader_1 = require("./AddressLoader");
const RankLoader_1 = require("./RankLoader");
const CommentLoader_1 = require("./CommentLoader");
const ChatLoader_1 = require("./ChatLoader");
const ProposeLoader_1 = require("./ProposeLoader");
const CategoryLoader_1 = require("./CategoryLoader");
class DataLoaderFactory {
    constructor(db, requestedFields) {
        this.db = db;
        this.requestedFields = requestedFields;
    }
    getLoaders() {
        return {
            userLoader: new DataLoader((params) => UserLoader_1.UserLoader.batchUsers(this.db.User, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            postLoader: new DataLoader((params) => PostLoader_1.PostLoader.batchPosts(this.db.Post, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            playerLoader: new DataLoader((params) => playerLoader_1.PlayerLoader.batchPlayers(this.db.Player, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            skillsLoader: new DataLoader((params) => SkillsLoader_1.SkillsLoader.batchSkillss(this.db.Skills, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            proposeLoader: new DataLoader((params) => ProposeLoader_1.ProposeLoader.batchProposes(this.db.Propose, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            addressLoader: new DataLoader((params) => AddressLoader_1.AddressLoader.batchAddresss(this.db.Address, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            chatLoader: new DataLoader((params) => ChatLoader_1.ChatLoader.batchChats(this.db.Chat, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            commentLoader: new DataLoader((params) => CommentLoader_1.CommentLoader.batchComments(this.db.Comment, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            notificationLoader: new DataLoader((params) => NotificationLoader_1.NotificationLoader.batchNotifications(this.db.Notification, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            rankLoader: new DataLoader((params) => RankLoader_1.RankLoader.batchRanks(this.db.Rank, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            anuncioLoader: new DataLoader((params) => AnuncioLoader_1.AnuncioLoader.batchAnuncios(this.db.Anuncio, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            categoryLoader: new DataLoader((params) => CategoryLoader_1.CategoryLoader.batchCategorys(this.db.Category, params, this.requestedFields), { cacheKeyFn: (param) => param.key })
        };
    }
}
exports.DataLoaderFactory = DataLoaderFactory;
