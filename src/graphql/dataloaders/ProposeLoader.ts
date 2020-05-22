import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";
import { ProposeInstance, ProposeModel } from "../../models/ProposeModel";

export class ProposeLoader {

    static batchProposes(Propose: ProposeModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<ProposeInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            Propose.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: ['address', 'chatsFrom', 'chatsTo', 'commentsTo', 'commentsfrom', 'notifications', 'proposes', 'proposesFrom', 'ranks', 'anuncioses', 'ranksmaked']})
            })
        );
    }

}