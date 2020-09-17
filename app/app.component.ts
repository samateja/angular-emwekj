import { Component } from '@angular/core';
import { Message, User, SendMessageEvent } from '@progress/kendo-angular-conversational-ui';

const bot: User = {
  id: 0
};

const user: User = {
  id: 1
};

const hello: Message = {
  text: 'Hello!',
  author: bot
};

@Component({
    selector: 'my-app',
    template: `
      <kendo-chat
        [messages]="feed"
        [user]="user"
        (sendMessage)="sendMessage($event)"
      >
      </kendo-chat>
    `
})
export class AppComponent {
  public feed: Message[] = [ hello ];
  public readonly user: User = user;
  public readonly bot: User = bot;

  public sendMessage(e: SendMessageEvent): void {
    const echo: Message = {
      author: bot,
      text: `You said: "${ e.message.text }"`
    };

    this.feed = [...this.feed, e.message, echo];
  }
 }
