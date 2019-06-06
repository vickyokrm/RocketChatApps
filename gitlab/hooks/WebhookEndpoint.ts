import {IHttp, IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors';
import {ApiEndpoint, IApiEndpointInfo, IApiRequest, IApiResponse} from '@rocket.chat/apps-engine/definition/api';
import {sendNotification} from '../lib/sendNotification';

export class WebhookEndpoint extends ApiEndpoint {
    public path = 'webhook';

    public async post(
        request: IApiRequest,
        endpoint: IApiEndpointInfo,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
    ): Promise<IApiResponse> {
        const room = await read.getRoomReader().getById('GENERAL');
        const user = await read.getUserReader().getById('admin');
        if (room) {
            console.log(modify.getCreator());
            await sendNotification(JSON.stringify(request, null, 2), read, modify, user, room);
        }
        return this.success();
    }
}
