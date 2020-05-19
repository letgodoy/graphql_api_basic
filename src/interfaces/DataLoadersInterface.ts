import * as DataLoader from 'dataloader';

import { UserInstance } from '../models/UserModel';
import { PostInstance } from '../models/PostModel';
import { DataLoaderParam } from './DataLoaderParamInterface';
import { PlayerInstance } from '../models/PlayerModel';
import { SkillsInstance } from '../models/SkillsModel';
import { ProposeInstance } from '../models/ProposeModel';

export interface DataLoaders {

    userLoader: DataLoader<DataLoaderParam<number>, UserInstance>;
    postLoader: DataLoader<DataLoaderParam<number>, PostInstance>;
    playerLoader: DataLoader<DataLoaderParam<number>, PlayerInstance>;
    skillsLoader: DataLoader<DataLoaderParam<number>, SkillsInstance>;
    proposeLoader: DataLoader<DataLoaderParam<number>, ProposeInstance>;
    

}