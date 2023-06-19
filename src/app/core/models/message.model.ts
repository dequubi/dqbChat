import { ChatUserstate } from 'tmi.js';

export interface MessageModel {
    channel: string;
    userState: ChatUserstate;
    message: string;
    self: boolean;
}
