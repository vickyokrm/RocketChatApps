import { IConfigurationExtend, IEnvironmentRead, IHttp, IHttpResponse, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISetting } from '@rocket.chat/apps-engine/definition/settings';

export interface IIssue {
    project: string;
    title: string;
    description?: string;
    label?: string;
}
export class Issue {
    constructor() { }
    /**
     * getSingleIssue
     */
    public getSingleIssue() {
        console.log('To be implemented');
    }

    /**
     * listIssues
     */
    public listIssues() {
        console.log('To be implemented');
    }

    /**
     * createIssue
     */
    public async createIssue(issue: IIssue, read: IRead, modify: IModify, http: IHttp): Promise<IHttpResponse> {
        const url = await read.getEnvironmentReader().getSettings().getById('url');
        const token = await read.getEnvironmentReader().getSettings().getById('token');
        const params = {
            title: issue.title,
        };
        try {
            return await http.post(`${url.value}/projects/${encodeURIComponent(issue.project)}/issues`, {
                params,
                headers: {
                    'PRIVATE-TOKEN': token.value,
                },
            });
        } catch (error) {
            throw new Error('Unable to create the issue');
        }
    }
}
