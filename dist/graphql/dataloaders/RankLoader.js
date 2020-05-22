"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RankLoader {
    static batchRanks(Rank, params, requestedFields) {
        let ids = params.map(param => param.key);
        return Promise.resolve(Rank.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['player', 'propose', 'from'] })
        }));
    }
}
exports.RankLoader = RankLoader;
