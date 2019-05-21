import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
import { CircleCi } from './commands/CircleCi';

export class CircleCiApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        configuration.settings.provideSetting({
            id: 'token',
            type: SettingType.STRING,
            required: true,
            public: true,
            packageValue: '',
            i18nLabel: 'token',
        });
        configuration.settings.provideSetting({
            id: 'repo',
            type: SettingType.SELECT,
            values: [{key: 'github', i18nLabel: 'github'}],
            required: true,
            public: true,
            packageValue: '',
            i18nLabel: 'repo',
        });

        configuration.settings.provideSetting({
            id: 'user',
            type: SettingType.STRING,
            required: true,
            public: true,
            packageValue: '',
            i18nLabel: 'user',
        });

        configuration.settings.provideSetting({
            id: 'project',
            type: SettingType.STRING,
            required: true,
            public: true,
            packageValue: '',
            i18nLabel: 'project',
        });

        await configuration.slashCommands.provideSlashCommand(new CircleCi(this));
    }
}
