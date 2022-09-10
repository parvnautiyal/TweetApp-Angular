export class Tweet {

  public liked: boolean;
  public replyTyping: string;

  constructor(public id: any, public username: string, public content: string, public tag: string, public created: Date,
              public likes: Map<string, string>, public replies: any) {
  }
}
