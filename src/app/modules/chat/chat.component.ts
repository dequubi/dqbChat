import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TmiService } from '@app/modules/chat/services/tmi.service';
import anime from 'animejs/lib/anime.es';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    providers: [TmiService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

    @ViewChild('container') msgContainer: ElementRef<HTMLDivElement>;

    public newMessage$ = this.tmiService.newMessage$.asObservable();
    public messageList$ = this.tmiService.messageList$.asObservable();

    public messageList = this.tmiService.messageList;

    constructor(private tmiService: TmiService,
                private renderer: Renderer2
    ) {
    }

    ngOnInit(): void {
        this.newMessage$.subscribe({
            next: (msg) => {
                console.log(msg);
            }
        });
    }

    messageInit(msg: HTMLDivElement): void {
        this.animateMessageAppearance(msg);
    }

    private animateMessageAppearance(msg: HTMLDivElement, duration = 500): void {
        msg.style.minWidth = `${this.msgContainer.nativeElement.offsetWidth - 8}px`;
        msg.style.maxWidth = `${this.msgContainer.nativeElement.offsetWidth - 8}px`;
        console.log(msg.offsetWidth, this.msgContainer.nativeElement.offsetWidth);
        const height = msg.offsetHeight;
        msg.style.minWidth = 'initial';
        msg.style.maxWidth = 'initial';
        msg.style.position = 'initial';
        anime({
            targets: msg,
            height: ['0', height - 8],
            duration
        }).finished.then(() => {
            // msg.style.height = 'initial';
        });
    }
}
