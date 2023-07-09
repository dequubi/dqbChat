import { StvOwnerModel } from '@app/modules/chat/models/7tv-owner.model';

export interface StvEmoteModel {
    id: string;
    name: string;
    flags: number;
    timestamp: number;
    actor_id: number;
    data: {
        id: string;
        name: string;
        flags: number;
        lifecycle: number;
        state: Array<'LISTED' | 'PERSONAL' | string>;
        listed: boolean;
        animated: boolean;
        owner: StvOwnerModel;
        host: {
            url: string;
            files: Array<{
                name: string;
                static_name: string;
                width: number;
                height: number;
                frame_count: number;
                size: number;
                format: 'WEBP' | 'AVIF';
            }>;
        };
    };
}
