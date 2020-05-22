import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";
import { ChatInstance, ChatModel } from "../../models/ChatModel";

export class ChatLoader {

    static batchChats(Chat: ChatModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<ChatInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            Chat.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: ['to', 'propose', 'from']})
            })
        );
    }

}