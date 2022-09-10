import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TweetsComponent} from './tweets.component';
import {TweetService} from "../../../../services/tweet/tweet.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {of, throwError} from "rxjs";
import {
  deleteTweetSuccessResponse,
  dislikeTweetSuccessResponse,
  likeTweetSuccessResponse,
  replyTweetSuccessResponse
} from "../../../../../mocks/mockResponses";
import {mockTweet1, mockTweet2, mockTweetArray} from "../../../../../mocks/mockTweets";
import {Tweet} from "../../../../shared/models/tweet/tweet";

describe('TweetsComponent', () => {
  let component: TweetsComponent;
  let fixture: ComponentFixture<TweetsComponent>;
  let tweetService: TweetService;
  let router: Router;
  let reloadSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TweetsComponent],
      providers: [TweetService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              editMode: 'true'
            }),
            snapshot: new ActivatedRouteSnapshot()
          }
        }],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetsComponent);
    component = fixture.componentInstance;
    tweetService = TestBed.inject(TweetService);
    router = TestBed.inject(Router);
    reloadSpy = spyOn(component, 'reloadCurrentRoute').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test showTweetsByUser', () => {
    let navigateSpy = spyOn(router, 'navigate');
    component.showTweetsByUser("user");
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should test the reload route method', () => {
    let initSpy = spyOn(component, 'ngOnInit');
    component.reloadCurrentRoute();
    expect(initSpy).toHaveBeenCalled();
  });

  it('should test the deleteTweetMethod', fakeAsync(() => {
    let confirmSpy = spyOn(window, 'confirm').and.returnValue(true);
    let tweetServiceSpy = spyOn(tweetService, 'deleteTweet').and.callThrough().and.returnValue(of(deleteTweetSuccessResponse));
    let subSpy = spyOn(tweetService.deleteTweet("user", "tweet"), 'subscribe').and.callThrough();
    component.onDelete("tweet");
    expect(confirmSpy).toHaveBeenCalled();
    expect(tweetServiceSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(reloadSpy).toHaveBeenCalled();
  }));

  it('should test the showLikes method for likes on tweet', () => {
    let res = component.showLikes(mockTweet2);
    expect(res).toEqual(2);
  });

  it('should test the showLikes method for no likes', () => {
    let res = component.showLikes(mockTweet1);
    expect(res).toEqual(0);
  });

  it('should test method likeStatus if already liked', () => {
    localStorage.setItem("token", "user1");
    let res = component.likeStatus(mockTweet2);
    expect(res).toBeTrue();
    localStorage.clear();
  });

  it('should test method likeStatus if not liked', () => {
    let res = component.likeStatus(mockTweet1);
    expect(res).toBeFalse();
  });

  it('should test likeTweet method for success', fakeAsync(() => {
    let tweetServiceSpy = spyOn(tweetService, 'likeTweet').and.callThrough().and.returnValue(of(likeTweetSuccessResponse));
    let subSpy = spyOn(tweetService.likeTweet("user", "tweet"), 'subscribe').and.callThrough();
    localStorage.setItem("token", "user");
    component.likeTweet("tweet");
    expect(tweetServiceSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(reloadSpy).toHaveBeenCalled();
    localStorage.clear();
  }));

  it('should test dislikeTweet method for success', fakeAsync(() => {
    let tweetServiceSpy = spyOn(tweetService, 'dislikeTweet').and.callThrough().and.returnValue(of(dislikeTweetSuccessResponse));
    let subSpy = spyOn(tweetService.dislikeTweet("user", "tweet"), 'subscribe').and.callThrough();
    component.dislikeTweet("tweet");
    expect(tweetServiceSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(reloadSpy).toHaveBeenCalled();
  }));

  it('should test the showReplies method for replies on tweet', () => {
    let res = component.showReplies(mockTweet2);
    expect(res.length).toEqual(1);
  });

  it('should test the showReplies method for no replies', () => {
    let res = component.showReplies(mockTweet1);
    expect(res).toBeNull();
  });

  it('should test replyTweet method for success', fakeAsync(() => {
    let tweetServiceSpy = spyOn(tweetService, 'replyTweet').and.callThrough().and.returnValue(of(replyTweetSuccessResponse));
    let subSpy = spyOn(tweetService.replyTweet("user", "tweet", "reply"), 'subscribe').and.callThrough();
    let timeOutSpy = spyOn(window, 'setTimeout').and.callThrough();
    localStorage.setItem("token", "user");
    component.replyTweet("tweet", "reply");
    tick(200);
    expect(tweetServiceSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
    expect(timeOutSpy).toHaveBeenCalledBefore(reloadSpy);
    expect(reloadSpy).toHaveBeenCalled();
    localStorage.clear();
  }));

  it('should test updateTweet method', () => {
    let routerSpy = spyOn(router, 'navigate');
    component.updateTweet(mockTweet1)
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should check if all tweets data is loaded', fakeAsync(() => {
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.queryParams = of({username: null});
    let tweetServiceSpy = spyOn(tweetService, 'showTweets').and.callThrough().and.returnValue(of(mockTweetArray));
    let subSpy = spyOn(tweetService.showTweets(null), 'subscribe').and.callThrough();
    let subjectSpy = spyOn(component.errorStatus, 'next').and.callThrough();
    component.ngOnInit();
    expect(tweetServiceSpy).toHaveBeenCalled();
    expect(subSpy).toHaveBeenCalled();
    expect(component.tweets.length).toEqual(3);
    expect(subjectSpy).toHaveBeenCalledWith(false);
  }));

  it('should check if tweets data is loaded by users', fakeAsync(() => {
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.queryParams = of({username: 'user1'});
    let tweetServiceSpy = spyOn(tweetService, 'showTweets').and.callThrough().and.returnValue(of(Array.of(mockTweet1)));
    let subSpy = spyOn(tweetService.showTweets('user1'), 'subscribe').and.callThrough();
    let subjectSpy = spyOn(component.errorStatus, 'next').and.callThrough();
    component.ngOnInit();
    expect(tweetServiceSpy).toHaveBeenCalled();
    expect(subSpy).toHaveBeenCalled();
    expect(component.tweets.length).toEqual(1);
    expect(subjectSpy).toHaveBeenCalledWith(false);
  }));

  it('should test errors while loading data', function () {
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.queryParams = of({username: null});
    spyOn(tweetService, 'showTweets').and.callThrough().and.returnValue(throwError(() => new Array<Tweet>()));
    let subjectSpy = spyOn(component.errorStatus, 'next').and.callThrough();
    component.ngOnInit();
    expect(subjectSpy).toHaveBeenCalledWith(true);
  });
});
