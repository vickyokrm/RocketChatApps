import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { GitLabApp } from '../GitLabApp';
import { activateAccount } from '../lib/activateAccount';
import { createIssue } from '../lib/createIssue';

enum Commands {
    'Activate' = 'activate',
    'Create' = 'create',
    'Find' = 'find',
    'Help' = 'help',
    'Search' = 'search',
}

export class GitLabCommand implements ISlashCommand {
    public command = 'gitlab';
    public i18nDescription = 'gitlab_description';
    public i18nParamsExample = 'gitlab_params';
    public providesPreview = true;
    public constructor(private readonly app: GitLabApp) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const [command] = context.getArguments();
        switch (command) {
            case Commands.Activate:
                await activateAccount(context, read, modify, http, persis);
                break;
            case Commands.Create:
                await createIssue(this.app, context, read, modify, http, persis);
                break;
            default:
                break;
        }
    }

    // public async previewer(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<ISlashCommandPreview> {
    // const [command] = context.getArguments();
    // let i18nTitle: string;
    // let items: Array<ISlashCommandPreviewItem>;
    // switch (command) {
    //     case Commands.Search:
    //         i18nTitle = 'Results for ';
    //          items = await getSearchPreviewItems(context, read, modify, http);
    //         break;
    //     default:
    //         i18nTitle = 'Suggestions for';
    //         items = getHelp();
    //         break;
    // }
    // return {
    //     i18nTitle,
    //     items,
    // };
    // }

    // public async executePreviewItem(item: ISlashCommandPreviewItem, context: SlashCommandContext, read: IRead,
    //     // tslint:disable-next-line: align
    //     modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    //     let msg: string;
    //     switch (item.id) {
    //         case Commands.Activate:
    //             msg = 'Command usage: `/gitlab activate <your_auth_token>`';
    //             break;
    //         case Commands.Create:
    //             msg = 'Command usage: `/gitlab create`';
    //             break;
    //         case Commands.Help:
    //             msg = 'Command usage: `/gitlab help`';
    //             break;
    //         case Commands.Search:
    //             msg = 'Command usage: `/gitlab search <projects/issues> <keyword>`';
    //             break;
    //         default:
    //             msg = 'No usage for this command is assigned';
    //             break;
    //     }
    //     await sendNotification(msg, read, modify, context.getSender(), context.getRoom());
    // }
}
