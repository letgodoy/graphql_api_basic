"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProposeLoader {
    static batchProposes(Propose, params, requestedFields) {
        let ids = params.map(param => param.key);
        return Promise.resolve(Propose.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['address', 'chatsFrom', 'chatsTo', 'commentsTo', 'commentsfrom', 'notifications', 'proposes', 'proposesFrom', 'ranks', 'anuncioses', 'ranksmaked'] })
        }));
    }
}
exports.ProposeLoader = ProposeLoader;
