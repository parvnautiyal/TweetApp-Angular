import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Tweet} from "../../shared/models/tweet/tweet";
import {map, Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  tweetContent = new Map<string, string>();
  tweetTag = new Map<string, string>();

  constructor(private http: HttpService) {
  }

  showTweets(type: string) {
    let selection: Observable<HttpResponse<any>>;
    if (type) {
      selection = this.http.showTweetsByUser(type);
    } else {
      selection = this.http.getAllTweets();
    }
    return selection.pipe(map(response => {
      let tweet: Tweet;
      let tweets = new Array<Tweet>();
      response.body.forEach(data => {
        let newLikes: Map<string, string>;
        let newReplies: any[];
        if (data.likes) {
          newLikes = new Map(Object.entries(data.likes));
        }
        if (data.replies) {
          newReplies = data.replies;
        }
        if (data) {
          tweet = new Tweet(data.id, data.username, data.content, data.tag, data.created, newLikes, newReplies);
          this.tweetContent.set(tweet.id, tweet.content);
          this.tweetTag.set(tweet.id, tweet.tag);
          tweets.push(tweet);
        }
      })
      return tweets;
    }));
  }

  deleteTweet(username: string, tweetId: string) {
    return this.http.deleteTweet(username, tweetId);
  }

  likeTweet(username: string, tweetId: string) {
    return this.http.likeTweet(username, tweetId);
  }

  dislikeTweet(username: string, tweetId: string) {
    return this.http.dislikeTweet(username, tweetId);
  }

  replyTweet(username: string, tweetId: string, reply: string) {
    return this.http.replyTweet(username, tweetId, reply);
  }

  postTweet(username: string, tweet: any) {
    return this.http.postTweet(username, tweet);
  }

  updateTweet(username: string, tweetId: string, tweet: any) {
    return this.http.putTweet(username, tweetId, tweet);
  }

}
