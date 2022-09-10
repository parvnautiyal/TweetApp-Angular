import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TweetService} from "../../../../services/tweet/tweet.service";

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit {

  editMode = false;
  tweetContent = '';
  tweetTag = '';
  addForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private tweetService: TweetService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['editMode']) {
        this.editMode = true;
        this.tweetContent = this.tweetService.tweetContent.get(queryParams['tweet']);
        this.tweetTag = this.tweetService.tweetTag.get(queryParams['tweet']);
        this.initForm();
      }
      this.initForm();
    });
  }

  onCancel() {
    this.addForm.reset();
    this.router.navigate(["../"], {relativeTo: this.route});
  }

  onSubmit() {
    this.route.queryParams.subscribe(queryParams => {
      let tweet = {
        tweet: {
          content: this.addForm.value.content,
          tag: this.addForm.value.tag
        }
      };
      if (queryParams['editMode']) {
        this.tweetService.updateTweet(localStorage.getItem("token"), queryParams['tweet'], JSON.stringify(tweet)).subscribe({
          next: response => {
            console.log(response);
            setTimeout(() => {
              this.router.navigate(["../"], {relativeTo: this.route});
            }, 100);
          },
          error: error => {
            console.log(error);
          }
        });
      } else {
        this.tweetService.postTweet(localStorage.getItem("token"), JSON.stringify(tweet)).subscribe({
          next: response => {
            console.log(response);
            setTimeout(() => {
              this.router.navigate(["../"], {relativeTo: this.route});
            }, 100);
          },
          error: error => {
            console.log(error);
          }
        });
      }
    });
  }

  initForm() {
    let content = this.tweetContent;
    let tag = this.tweetTag;
    this.addForm = new FormGroup({
      content: new FormControl(content, [Validators.maxLength(144), Validators.required]),
      tag: new FormControl({value: tag, disabled: this.editMode}, [Validators.max(50), Validators.required])
    });
  }
}
