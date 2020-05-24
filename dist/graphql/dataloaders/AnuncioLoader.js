"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AnuncioLoader {
    static batchAnuncios(Anuncio, params, requestedFields) {
        let ids = params.map(param => param.key);
        return Promise.resolve(Anuncio.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['player', 'proposes', 'skills'] })
        }));
    }
}
exports.AnuncioLoader = AnuncioLoader;
