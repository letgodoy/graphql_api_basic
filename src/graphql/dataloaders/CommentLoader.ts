import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";
import { CommentInstance, CommentModel } from "../../models/CommentsModel";

export class CommentLoader {

    static batchComments(Comment: CommentModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<CommentInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            Comment.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: ['to', 'propose', 'from']})
            })
        );
    }

}