import { BehaviorSubject, Subject, take } from 'rxjs';
import { ChatUserstate } from 'tmi.js';
import * as tmi from 'tmi.js';
import { MessageModel } from '@core/models/message.model';
import { environment } from '@env/environment';

export class TmiService {

    public client: tmi.Client | undefined;

    public messageList$ = new BehaviorSubject<MessageModel[]>([]);
    public newMessage$: Subject<MessageModel> = new Subject<MessageModel>();

    private _messageList: MessageModel[] = [];
    private readonly _messageLimit = 20;

    constructor() {
        console.log('INIT', 'TmiService');
        this.messageList$
            .pipe(take(1))
            .subscribe(() => { this.initClient(); });
    }

    get messageList(): MessageModel[] {
        return this._messageList;
    }
    set messageList(list: MessageModel[]) {
        this._messageList = list;
        this.messageList$.next(this._messageList);
    }

    private initClient(): void {
        this.client = new tmi.Client({
            channels: environment.channels
        });

        this.client.connect().then(r => {
            console.log('CONNECTED', 'TmiClient', r);
        });
        this.client.on('message', this.message.bind(this));
    }

    private message(channel: string, userState: ChatUserstate, message: string, self: boolean): void {
        const msg: MessageModel = {
            channel,
            userState,
            message,
            self
        };
        this.newMessage$.next(msg);
        this.addMessageToList(msg);
    }

    private addMessageToList(msg: MessageModel): void {
        this._messageList.push(msg);
        if (this._messageList.length > this._messageLimit) {
            this._messageList.shift();
        }
        this.messageList$.next(this._messageList);
    }
}
