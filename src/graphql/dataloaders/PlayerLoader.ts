import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";
import { PlayerModel, PlayerInstance } from './../../models/PlayerModel';

export class PlayerLoader {

    static batchPosts(Player: PlayerModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<PlayerInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            Player.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: ['address', 'chatsFrom', 'chatsTo', 'commentsTo', 'commentsfrom', 'notifications', 'proposes', 'proposesFrom', 'ranks', 'anuncioses', 'ranksmaked']})
            })
        );
    }

}