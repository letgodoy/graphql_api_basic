import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";
import { RankInstance, RankModel } from "../../models/RankModel";

export class RankLoader {

    static batchRanks(Rank: RankModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<RankInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            Rank.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: ['player', 'propose', 'from']})
            })
        );
    }

}