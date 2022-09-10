import {Component, OnInit} from '@angular/core';
import {Tweet} from "../../../../shared/models/tweet/tweet";
import {Observable, Subject} from "rxjs";
import {TweetService} from "../../../../services/tweet/tweet.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  tweets: Tweet[];
  username: string;
  noTweetsFounds: boolean;
  errorStatus = new Subject<boolean>();
  liked: boolean;

  constructor(private tweetService: TweetService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.errorStatus.subscribe(data => {
        this.noTweetsFounds = data;
      });
      let tweetObservable: Observable<Tweet[]>;
      if (queryParams['username']) {
        tweetObservable = this.tweetService.showTweets(queryParams['username']);
      } else {
        tweetObservable = this.tweetService.showTweets(null);
      }
      tweetObservable.subscribe({
        next: (response) => {
          console.log(response);
          this.errorStatus.next(false);
          this.tweets = response;
          this.tweets = response.sort((a, b) => {
            return new Date(b.created).getTime() - new Date(a.created).getTime();
          });
        },
        error: (error) => {
          console.log(error);
          this.errorStatus.next(true);
        }
      });
    });
    this.username = localStorage.getItem("token");
  }

  showTweetsByUser(user: string) {
    this.router.navigate(['/dashboard/tweets'], {queryParams: {username: user}, relativeTo: this.route});
  }

  onDelete(tweetId: string) {
    if (confirm("deleting tweet!")) {
      this.tweetService.deleteTweet(localStorage.getItem("token"), tweetId).subscribe({
        next: response => {
          console.log(response);
          this.reloadCurrentRoute();
        }
      });
    }
  }

  showLikes(tweet: Tweet) {
    if (tweet.likes)
      return tweet.likes.size;
    else return 0;
  }

  likeStatus(tweet: Tweet) {
    tweet.liked = false;
    if (tweet.likes) {
      let likedBy = [...tweet.likes.keys()];
      if (likedBy.includes(localStorage.getItem("token"))) {
        tweet.liked = true;
      }
    }
    return tweet.liked;
  }

  likeTweet(tweetId: string) {
    this.tweetService.likeTweet(localStorage.getItem("token"), tweetId).subscribe({
      next: response => {
        console.log(response);
        this.reloadCurrentRoute();
      }
    });
  }

  dislikeTweet(tweetId: string) {
    this.tweetService.dislikeTweet(localStorage.getItem("token"), tweetId).subscribe({
      next: response => {
        console.log(response);
        this.reloadCurrentRoute();
      }
    });
  }

  showReplies(tweet: Tweet) {
    if (tweet.replies) {
      return tweet.replies;
    } else
      return null;
  }

  replyTweet(tweetId: string, reply: string) {
    this.tweetService.replyTweet(localStorage.getItem("token"), tweetId, reply).subscribe({
      next: response => {
        setTimeout(() => {
          console.log(response);
          this.reloadCurrentRoute();
        }, 200)
      }
    });
  }

  updateTweet(tweet) {
    this.router.navigate(['../tweet'], {queryParams: {tweet: tweet.id, 'editMode': 'true'}, relativeTo: this.route});
  }

  reloadCurrentRoute() {
    this.ngOnInit();
  }
}
