"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChatLoader {
    static batchChats(Chat, params, requestedFields) {
        let ids = params.map(param => param.key);
        return Promise.resolve(Chat.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['to', 'propose', 'from'] })
        }));
    }
}
exports.ChatLoader = ChatLoader;
