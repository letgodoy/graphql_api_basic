import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";
import { CategoryInstance, CategoryModel } from "../../models/CategoryModel";

export class CategoryLoader {

    static batchCategorys(Category: CategoryModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<CategoryInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            Category.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: ['user', 'skills']})
            })
        );
    }

}