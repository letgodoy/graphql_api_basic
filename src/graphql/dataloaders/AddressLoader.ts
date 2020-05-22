import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";
import { AddressInstance, AddressModel } from "../../models/AddressModel";

export class AddressLoader {

    static batchAddresss(Address: AddressModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<AddressInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            Address.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: ['player']})
            })
        );
    }

}