import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TwitchApiService {
    constructor(private httpClient: HttpClient) {
    }

    getUser(login: string): Observable<any> {
        const params = new HttpParams()
            .set('login', login);

        return this.httpClient.get('https://api.twitch.tv/helix/users', { params });
    }
}
