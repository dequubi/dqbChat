import { StvEmoteModel } from '@app/modules/chat/models/7tv-emote.model';
import { StvOwnerModel } from '@app/modules/chat/models/7tv-owner.model';

export interface StvEmoteSetModel {
    id: string;
    name: string;
    flags: number;
    tags: any[];
    immutable: boolean;
    privileged: boolean;
    emotes: StvEmoteModel[];
    capacity?: number;
    owner?: StvOwnerModel;
}
