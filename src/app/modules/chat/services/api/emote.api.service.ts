import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StvResponseModel } from '@app/modules/chat/models/7tv-response.model';

@Injectable({
    providedIn: 'root'
})
export class EmoteApiService {
    constructor(private httpClient: HttpClient) {
    }

    get7tvUser(): Observable<StvResponseModel> {
        return this.httpClient.get<StvResponseModel>('https://7tv.io/v3/users/twitch/132769622');
    }
}
