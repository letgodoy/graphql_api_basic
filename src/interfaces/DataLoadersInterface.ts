import * as DataLoader from 'dataloader';

import { UserInstance } from '../models/UserModel';
import { PostInstance } from '../models/PostModel';
import { DataLoaderParam } from './DataLoaderParamInterface';
import { PlayerInstance } from '../models/PlayerModel';
import { SkillsInstance } from '../models/SkillsModel';
import { ProposeInstance } from '../models/ProposeModel';
import { AddressInstance } from '../models/AddressModel';
import { ChatInstance } from '../models/ChatModel';
import { CommentInstance } from '../models/CommentsModel';
import { NotificationInstance } from '../models/NotificationModel';
import { RankInstance } from '../models/RankModel';
import { AnuncioInstance } from '../models/AnuncioModel';
import { CategoryInstance } from '../models/CategoryModel';

export interface DataLoaders {

    userLoader: DataLoader<DataLoaderParam<number>, UserInstance>;
    postLoader: DataLoader<DataLoaderParam<number>, PostInstance>;
    playerLoader: DataLoader<DataLoaderParam<number>, PlayerInstance>;
    skillsLoader: DataLoader<DataLoaderParam<number>, SkillsInstance>;
    proposeLoader: DataLoader<DataLoaderParam<number>, ProposeInstance>;
    addressLoader: DataLoader<DataLoaderParam<number>, AddressInstance>;
    chatLoader: DataLoader<DataLoaderParam<number>, ChatInstance>;
    commentLoader: DataLoader<DataLoaderParam<number>, CommentInstance>;
    notificationLoader: DataLoader<DataLoaderParam<number>, NotificationInstance>;
    rankLoader: DataLoader<DataLoaderParam<number>, RankInstance>;
    anuncioLoader: DataLoader<DataLoaderParam<number>, AnuncioInstance>;
    categoryLoader: DataLoader<DataLoaderParam<number>, CategoryInstance>;

}