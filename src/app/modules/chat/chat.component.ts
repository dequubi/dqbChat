import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TmiService } from '@core/services/tmi.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

    public newMessage$ = TmiService.newMessage$.asObservable();
    public messageList$ = TmiService.messageList$.asObservable();

    public messageList = TmiService.messageList;

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
