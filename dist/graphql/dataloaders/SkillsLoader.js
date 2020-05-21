"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SkillsLoader {
    static batchSkillss(Skills, params, requestedFields) {
        let ids = params.map(param => param.key);
        return Promise.resolve(Skills.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['user'] })
        }));
    }
}
exports.SkillsLoader = SkillsLoader;
