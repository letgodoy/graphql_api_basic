"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddressLoader {
    static batchAddresss(Address, params, requestedFields) {
        let ids = params.map(param => param.key);
        return Promise.resolve(Address.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['player'] })
        }));
    }
}
exports.AddressLoader = AddressLoader;
