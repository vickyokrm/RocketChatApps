import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, ISlashCommandPreview, SlashCommandContext, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';
import { CircleCiApp } from '../CircleCiApp';
import { sendMessage } from '../lib/sendMessage';

enum Command  {
    LATEST =  'latest',
}

export class CircleCi implements ISlashCommand {
    public command = 'circleci';
    public i18nParamsExample = 'circleci_params';
    public i18nDescription = 'circleci_description';
    public providesPreview = false;

    constructor(private readonly app: CircleCiApp) { }
    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const [command] = context.getArguments();
        switch (command) {
            case Command.LATEST:
                await this.processLatestCommand(context, read, modify, http, persis);
                break;
            default:
                break;
        }
    }

    private async processLatestCommand(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const token = await read.getEnvironmentReader().getSettings().getById('token');
        const project = await read.getEnvironmentReader().getSettings().getById('project');
        const user = await read.getEnvironmentReader().getSettings().getById('user');
        const repo = await read.getEnvironmentReader().getSettings().getById('repo');
        const url = `https://circleci.com/api/v1.1/project/${repo.value}/${user.value}/${project.value}`;
        const results = await http.get(url, {
            params: {
                'circle-token': token.value,
                'limit' : '5',
                'shallow': 'true',
            },
            headers: {
                Accept: 'application/json',
            },
        });
        if (results.statusCode === 200 && results.data) {
            results.data.map(async (build) => {
                const msg = `Branch: ${ build.branch }
                             User: ${ build.user.name }
                             Status: ${ build.status }
                             Subject: ${ build.subject }
                             Url: ${ build.build_url }`;
                await sendMessage(msg, read, modify, context.getSender(), context.getRoom());
            });
        }
    }

}
