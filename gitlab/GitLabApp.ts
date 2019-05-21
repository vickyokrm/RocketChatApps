import {
    IAppAccessors,
    IConfigurationExtend,
    IConfigurationModify,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { ISetting, SettingType } from '@rocket.chat/apps-engine/definition/settings';
import { GitLabCommand } from './commands/GitLabCommands';
import { Issue } from './models/Issue';

export class GitLabApp extends App {
    public issue: Issue;

    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async initialize(configurationExtend: IConfigurationExtend, environmentRead: IEnvironmentRead) {
        configurationExtend.settings.provideSetting({
            id: 'url',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'url',
        });
        configurationExtend.settings.provideSetting({
            id: 'token',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'token',
        });
        configurationExtend.slashCommands.provideSlashCommand(new GitLabCommand(this));
        this.issue = new Issue();
    }

    public async onSettingUpdated(setting: ISetting, configurationModify: IConfigurationModify, read: IRead, http: IHttp) {
        console.log('Settings updated');
    }
}
