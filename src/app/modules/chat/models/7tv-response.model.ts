import { StvEmoteSetModel } from '@app/modules/chat/models/7tv-emote-set.model';
import { StvOwnerModel } from '@app/modules/chat/models/7tv-owner.model';

type Modify<T, R> = Omit<T, keyof R> & R;

export interface StvResponseModel {
    id: string;
    platform: 'TWITCH' | string;
    username: string;
    display_name: string;
    linked_at: number;
    emote_capacity: number;
    emote_set_id: null | number;
    emote_set: StvEmoteSetModel;
    user: {
        id: string;
        username: string;
        display_name: string;
        created_at: number;
        avatar_url: string;
        biography: string;
        style: object;
        roles: string[];
        connections: Array<Modify<StvResponseModel, {
            emote_set: Omit<StvEmoteSetModel, 'emotes'>;
            owner?: StvOwnerModel;
        }>>;
    };
}
