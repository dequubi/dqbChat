import { ChangeDetectionStrategy, Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
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


    constructor (private tmiService: TmiService,
                 private renderer: Renderer2
    ) {
    }

    ngOnInit (): void {
        this.newMessage$.subscribe({
            next: (msg) => {
                console.log(msg);
            }
        });
    }

    test (msg: HTMLDivElement): void {
        // msg.className = 'chat__message';
        // console.log(msg.offsetHeight);
        setTimeout(() => {
            this.renderer.setStyle(msg, 'display', 'block');
            this.renderer.setStyle(msg, 'margin-bottom', '0');
        }, 300);
    }

}
