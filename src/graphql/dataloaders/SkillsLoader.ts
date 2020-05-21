import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";
import { SkillsModel, SkillsInstance } from "../../models/SkillsModel";

export class SkillsLoader {

    static batchSkillss(Skills: SkillsModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<SkillsInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            Skills.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: ['user']})
            })
        );
    }

}