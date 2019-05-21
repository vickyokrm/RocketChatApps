import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { ISlashCommandPreviewItem, SlashCommandContext, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { GitLabApp } from '../GitLabApp';
import { getIssuesPreviewItems } from './issue';
import { sendNotification } from './sendNotification';

export async function getSearchPreviewItems(app: GitLabApp, context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<Array<ISlashCommandPreviewItem>> {
    const [, scope, keyword] = context.getArguments();
    return await getIssuesPreviewItems(app, context, read, http, persis);
}

export async function executeSearchPreviewItem(id: string, read: IRead, modify: IModify, sender: IUser, room: IRoom) {
    console.log(id);
    // await sendNotification(msg, read, modify, sender, room);
}
