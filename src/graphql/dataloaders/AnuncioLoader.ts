import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";
import { AnuncioInstance, AnuncioModel } from "../../models/AnuncioModel";

export class AnuncioLoader {

    static batchAnuncios(Anuncio: AnuncioModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<AnuncioInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            Anuncio.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: ['player', 'proposes', 'skills']})
            })
        );
    }

}