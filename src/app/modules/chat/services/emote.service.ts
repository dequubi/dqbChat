import { Injectable } from '@angular/core';
import { EmoteApiService } from '@app/modules/chat/services/api/emote.api.service';
import { StvEmoteModel } from '@app/modules/chat/models/7tv-emote.model';

@Injectable()
export class EmoteService {

    public stvEmotes: StvEmoteModel[];

    constructor(private api: EmoteApiService) {
    }

    init(): void {
        this.api.get7tvUser()
            .subscribe({
                next: (response) => {
                    this.stvEmotes = response.emote_set.emotes;
                }
            });
    }
}
