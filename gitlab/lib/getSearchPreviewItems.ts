// import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
// import { ISlashCommandPreviewItem, SlashCommandContext, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';
// //import { resolveSearchRequest } from './resolveSearchRequest';

// export async function getSearchPreviewItems(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<Array<ISlashCommandPreviewItem>> {
//     const [, scope, keyword] = context.getArguments();
// /*     if (scope !== 'projects' || 'issues') {
//         throw new Error('Incorrect scope value' + scope);
//     } */
//     //const searchResults = await resolveSearchRequest(scope, keyword, read, modify, http);
//     return searchResults.data.map((r: any) => {
//         return {
//             id: r.id,
//             type: SlashCommandPreviewItemType.TEXT,
//             value: `Id: ${r.id} Title: ${r.title} `,
//         };
//     });
// }
