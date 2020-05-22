"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentLoader {
    static batchComments(Comment, params, requestedFields) {
        let ids = params.map(param => param.key);
        return Promise.resolve(Comment.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['to', 'propose', 'from'] })
        }));
    }
}
exports.CommentLoader = CommentLoader;
