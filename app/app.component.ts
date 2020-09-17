import { Component } from "@angular/core";
import {
  Message,
  User,
  SendMessageEvent
} from "@progress/kendo-angular-conversational-ui";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

const bot: User = {
  id: 0
};

const user: User = {
  id: 1
};

const hello: Message = {
  text: "Hello!",
  author: bot
};

@Component({
  selector: "my-app",
  template: `
    <kendo-chat
      [messages]="feed"
      [user]="user"
      (sendMessage)="getMessage($event)"
    >
    </kendo-chat>
  `
})
export class AppComponent {
  public feed: Message[] = [hello];
  public readonly user: User = user;
  public readonly bot: User = bot;
  public url: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {}

  public getMessage(e: SendMessageEvent) {
    this.http
      .post<any>(this.url, { message: e.message.text })
      .subscribe(data => {
        e.message.text = data.message;
        this.sendMessage(e);
      });
  }

  public sendMessage(e: SendMessageEvent): void {
    const echo: Message = {
      author: bot,
      text: `You said: "${e.message.text}"`
    };

    this.feed = [...this.feed, e.message, echo];
  }
}
