"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataLoader = require("dataloader");
const UserLoader_1 = require("./UserLoader");
const PostLoader_1 = require("./PostLoader");
const playerLoader_1 = require("./playerLoader");
const SkillsLoader_1 = require("./SkillsLoader");
class DataLoaderFactory {
    constructor(db, requestedFields) {
        this.db = db;
        this.requestedFields = requestedFields;
    }
    getLoaders() {
        return {
            userLoader: new DataLoader((params) => UserLoader_1.UserLoader.batchUsers(this.db.User, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            postLoader: new DataLoader((params) => PostLoader_1.PostLoader.batchPosts(this.db.Post, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            playerLoader: new DataLoader((params) => playerLoader_1.PlayerLoader.batchPosts(this.db.Player, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            skillsLoader: new DataLoader((params) => SkillsLoader_1.SkillsLoader.batchPosts(this.db.Skills, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            proposeLoader: new DataLoader((params) => ProposeLoader.batchPosts(this.db.Propose, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            addressLoader: new DataLoader((params) => AddressLoader.batchPosts(this.db.Address, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            chatLoader: new DataLoader((params) => ChatLoader.batchPosts(this.db.Chat, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            commentLoader: new DataLoader((params) => CommentLoader.batchPosts(this.db.Comment, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            notificationLoader: new DataLoader((params) => NotificationLoader.batchPosts(this.db.Notification, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            rankLoader: new DataLoader((params) => RankLoader.batchPosts(this.db.Rank, params, this.requestedFields), { cacheKeyFn: (param) => param.key }),
            anuncioLoader: new DataLoader((params) => AnuncioLoader.batchPosts(this.db.Anuncio, params, this.requestedFields), { cacheKeyFn: (param) => param.key })
        };
    }
}
exports.DataLoaderFactory = DataLoaderFactory;
