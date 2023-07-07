import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TmiService } from '@app/modules/chat/services/tmi.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    providers: [TmiService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

    public newMessage$ = this.tmiService.newMessage$.asObservable();
    public messageList$ = this.tmiService.messageList$.asObservable();

    public messageList = this.tmiService.messageList;

    constructor(private tmiService: TmiService) {
    }

    ngOnInit(): void {
        this.newMessage$.subscribe({
            next: (msg) => {
                console.log(msg.userState.username, msg.message);
            }
        });
    }

}
