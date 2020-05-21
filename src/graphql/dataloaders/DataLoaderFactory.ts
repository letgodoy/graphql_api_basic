import * as DataLoader from 'dataloader';

import { DbConnection } from "../../interfaces/DbConnectionInterface";
import { DataLoaders } from "../../interfaces/DataLoadersInterface";
import { UserLoader } from './UserLoader';
import { UserInstance } from '../../models/UserModel';
import { PostInstance } from '../../models/PostModel';
import { PostLoader } from './PostLoader';
import { RequestedFields } from '../ast/RequestedFields';
import { DataLoaderParam } from '../../interfaces/DataLoaderParamInterface';
import { PlayerInstance } from '../../models/PlayerModel';
import { SkillsInstance } from '../../models/SkillsModel';
import { ProposeInstance } from '../../models/ProposeModel';
import { AddressInstance } from '../../models/AddressModel';
import { ChatInstance } from '../../models/ChatModel';
import { CommentInstance } from '../../models/CommentsModel';
import { NotificationInstance } from '../../models/NotificationModel';
import { RankInstance } from '../../models/RankModel';
import { AnuncioInstance } from '../../models/AnuncioModel';
import { PlayerLoader } from './playerLoader';
import { SkillsLoader } from './SkillsLoader';

export class DataLoaderFactory {

    constructor(
        private db: DbConnection,
        private requestedFields: RequestedFields
    ) {}

    getLoaders(): DataLoaders {
        return {
            userLoader: new DataLoader<DataLoaderParam<number>, UserInstance>(
                (params: DataLoaderParam<number>[]) => UserLoader.batchUsers(this.db.User, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            postLoader: new DataLoader<DataLoaderParam<number>, PostInstance>(
                (params: DataLoaderParam<number>[]) => PostLoader.batchPosts(this.db.Post, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            playerLoader: new DataLoader<DataLoaderParam<number>, PlayerInstance>(
                (params: DataLoaderParam<number>[]) => PlayerLoader.batchPosts(this.db.Player, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            skillsLoader: new DataLoader<DataLoaderParam<number>, SkillsInstance>(
                (params: DataLoaderParam<number>[]) => SkillsLoader.batchPosts(this.db.Skills, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            proposeLoader: new DataLoader<DataLoaderParam<number>, ProposeInstance>(
                (params: DataLoaderParam<number>[]) => ProposeLoader.batchPosts(this.db.Propose, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            addressLoader: new DataLoader<DataLoaderParam<number>, AddressInstance>(
                (params: DataLoaderParam<number>[]) => AddressLoader.batchPosts(this.db.Address, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            chatLoader: new DataLoader<DataLoaderParam<number>, ChatInstance>(
                (params: DataLoaderParam<number>[]) => ChatLoader.batchPosts(this.db.Chat, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            commentLoader: new DataLoader<DataLoaderParam<number>, CommentInstance>(
                (params: DataLoaderParam<number>[]) => CommentLoader.batchPosts(this.db.Comment, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            notificationLoader: new DataLoader<DataLoaderParam<number>, NotificationInstance>(
                (params: DataLoaderParam<number>[]) => NotificationLoader.batchPosts(this.db.Notification, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            rankLoader: new DataLoader<DataLoaderParam<number>, RankInstance>(
                (params: DataLoaderParam<number>[]) => RankLoader.batchPosts(this.db.Rank, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            anuncioLoader: new DataLoader<DataLoaderParam<number>, AnuncioInstance>(
                (params: DataLoaderParam<number>[]) => AnuncioLoader.batchPosts(this.db.Anuncio, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            )

        };
    }

}