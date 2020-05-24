"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryLoader {
    static batchCategorys(Category, params, requestedFields) {
        let ids = params.map(param => param.key);
        return Promise.resolve(Category.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['user', 'skills'] })
        }));
    }
}
exports.CategoryLoader = CategoryLoader;
