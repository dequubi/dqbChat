import { BehaviorSubject, Subject, take } from 'rxjs';
import { ChatUserstate } from 'tmi.js';
import { Injectable } from '@angular/core';
import * as tmi from 'tmi.js';
import { MessageModel } from '@core/models/message.model';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class TmiService {
    static messageList$: BehaviorSubject<MessageModel[]> = new BehaviorSubject<MessageModel[]>([]);
    static newMessage$: Subject<MessageModel> = new Subject<MessageModel>();

    static client: tmi.Client | undefined;

    private static _messageList: MessageModel[] = [];
    private static readonly _messageLimit = 5;

    constructor() {
        TmiService.messageList$
            .pipe(take(1))
            .subscribe({
                next: () => {
                    TmiService.initClient();
                }
            });
    }

    static get messageList(): MessageModel[] {
        return TmiService._messageList;
    }
    static set messageList(list: MessageModel[]) {
        TmiService._messageList = list;
        TmiService.messageList$.next(this._messageList);
    }

    private static initClient(): void {
        TmiService.client = new tmi.Client({
            channels: environment.channels
        });

        TmiService.client.connect();
        TmiService.client.on('message', TmiService.message);
    }

    private static message(channel: string, userState: ChatUserstate, message: string, self: boolean): void {
        const msg: MessageModel = {
            channel,
            userState,
            message,
            self
        };
        TmiService.newMessage$.next(msg);
        TmiService.addMessageToList(msg);
    }

    private static addMessageToList(msg: MessageModel): void {
        TmiService._messageList.push(msg);
        if (TmiService._messageList.length > TmiService._messageLimit) {
            TmiService._messageList.shift();
        }
        TmiService.messageList$.next(TmiService._messageList);
    }
}
