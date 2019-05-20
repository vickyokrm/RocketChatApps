import { ISlashCommandPreviewItem, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';

export function getHelp(): Array<ISlashCommandPreviewItem> {
    return [{
        id: 'activate',
        type: SlashCommandPreviewItemType.TEXT,
        value: 'Activate',
    }, {
        id: 'create',
        type: SlashCommandPreviewItemType.TEXT,
        value: 'Create',
    }, {
        id: 'help',
        type: SlashCommandPreviewItemType.TEXT,
        value: 'Help',
    }, {
        id: 'search',
        type: SlashCommandPreviewItemType.TEXT,
        value: 'Search',
    }];
}
