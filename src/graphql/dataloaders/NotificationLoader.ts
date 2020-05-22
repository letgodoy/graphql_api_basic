import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";
import { NotificationModel, NotificationInstance } from "../../models/NotificationModel";

export class NotificationLoader {

    static batchNotifications(Notification: NotificationModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<NotificationInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            Notification.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: ['player']})
            })
        );
    }

}