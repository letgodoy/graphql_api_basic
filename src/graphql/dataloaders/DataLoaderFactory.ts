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
import { NotificationLoader } from './NotificationLoader';
import { AnuncioLoader } from './AnuncioLoader';
import { AddressLoader } from './AddressLoader';
import { RankLoader } from './RankLoader';
import { CommentLoader } from './CommentLoader';
import { ChatLoader } from './ChatLoader';
import { ProposeLoader } from './ProposeLoader';
import { CategoryInstance } from '../../models/CategoryModel';
import { CategoryLoader } from './CategoryLoader';

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
                (params: DataLoaderParam<number>[]) => PlayerLoader.batchPlayers(this.db.Player, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            skillsLoader: new DataLoader<DataLoaderParam<number>, SkillsInstance>(
                (params: DataLoaderParam<number>[]) => SkillsLoader.batchSkillss(this.db.Skills, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            proposeLoader: new DataLoader<DataLoaderParam<number>, ProposeInstance>(
                (params: DataLoaderParam<number>[]) => ProposeLoader.batchProposes(this.db.Propose, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            addressLoader: new DataLoader<DataLoaderParam<number>, AddressInstance>(
                (params: DataLoaderParam<number>[]) => AddressLoader.batchAddresss(this.db.Address, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            chatLoader: new DataLoader<DataLoaderParam<number>, ChatInstance>(
                (params: DataLoaderParam<number>[]) => ChatLoader.batchChats(this.db.Chat, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            commentLoader: new DataLoader<DataLoaderParam<number>, CommentInstance>(
                (params: DataLoaderParam<number>[]) => CommentLoader.batchComments(this.db.Comment, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            notificationLoader: new DataLoader<DataLoaderParam<number>, NotificationInstance>(
                (params: DataLoaderParam<number>[]) => NotificationLoader.batchNotifications(this.db.Notification, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            rankLoader: new DataLoader<DataLoaderParam<number>, RankInstance>(
                (params: DataLoaderParam<number>[]) => RankLoader.batchRanks(this.db.Rank, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            anuncioLoader: new DataLoader<DataLoaderParam<number>, AnuncioInstance>(
                (params: DataLoaderParam<number>[]) => AnuncioLoader.batchAnuncios(this.db.Anuncio, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            categoryLoader: new DataLoader<DataLoaderParam<number>, CategoryInstance>(
                (params: DataLoaderParam<number>[]) => CategoryLoader.batchCategorys(this.db.Category, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            )

        };
    }

}