import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TmiService } from '@app/modules/chat/services/tmi.service';
import anime from 'animejs/lib/anime.es';
import { EmoteService } from '@app/modules/chat/services/emote.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    providers: [TmiService, EmoteService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

    @ViewChild('container') msgContainer: ElementRef<HTMLDivElement>;

    public newMessage$ = this.tmiService.newMessage$.asObservable();
    public messageList$ = this.tmiService.messageList$.asObservable();

    public messageList = this.tmiService.messageList;

    constructor(private tmiService: TmiService,
                private emoteService: EmoteService
    ) {
    }

    ngOnInit(): void {
        this.newMessage$.subscribe({
            next: (msg) => { console.log(msg); }
        });
        this.emoteService.init();
    }

    messageInit(msg: HTMLDivElement): void {
        this.swapTextForEmotes(msg);
        this.animateMessageAppearance(msg);
    }

    private swapTextForEmotes(msg: HTMLDivElement): void {
        const msgText = msg.querySelector('.chat__message__content')?.innerHTML.trim();
        if (!msgText) {
            console.error('No text inside');
            return;
        }
        const words = msgText.split(' ');
        words.forEach((word, index) => {
            if (this.emoteService.stvEmotes.map((emote) => emote.name).includes(word)) {
                console.log(`Word ${word} is a 7tv emote`);
            }
        });
    }

    private animateMessageAppearance(msg: HTMLDivElement, duration = 500): void {
        msg.style.minWidth = `${this.msgContainer.nativeElement.offsetWidth - 8}px`;
        msg.style.maxWidth = `${this.msgContainer.nativeElement.offsetWidth - 8}px`;
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
