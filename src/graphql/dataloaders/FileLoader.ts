import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";
import { FileInstance, FileModel } from "../../models/FileModel";

export class FileLoader {

    static batchFiles(File: FileModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<FileInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            File.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id']})
            })
        );
    }

}