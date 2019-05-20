import { HttpStatusCode, IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { GitLabApp } from '../GitLabApp';
import { sendNotification } from '../lib/sendNotification';

export async function createIssue(app: GitLabApp, context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const [, project, title, description, label] = context.getArguments();
    if (!project) {
        const text = 'Invalid Project name';
        await sendNotification(text, read, modify, context.getSender(), context.getRoom());
    }

    if (!title) {
        const text = 'Issue title cannot be empty';
        await sendNotification(text, read, modify, context.getSender(), context.getRoom());
    }

    const issue = {
        project,
        title,
        description,
        label,
    };

    const response = await app.issue.createIssue(issue, read, modify, http);
    if (response.statusCode === HttpStatusCode.CREATED && response.data) {
        const text = 'Issue created successfully';
        await sendNotification(text, read, modify, context.getSender(), context.getRoom());
    }
}
