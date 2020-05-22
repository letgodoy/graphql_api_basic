"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotificationLoader {
    static batchNotifications(Notification, params, requestedFields) {
        let ids = params.map(param => param.key);
        return Promise.resolve(Notification.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['player'] })
        }));
    }
}
exports.NotificationLoader = NotificationLoader;
