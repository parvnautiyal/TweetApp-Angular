import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PostTweetComponent} from './post-tweet.component';
import {TweetService} from "../../../../services/tweet/tweet.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../../../app-routing.module";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {of} from "rxjs";
import {postTweetSuccessResponse} from "../../../../../mocks/mockResponses";
import {mockTweet1} from "../../../../../mocks/mockTweets";

describe('PostTweetComponent', () => {
  let component: PostTweetComponent;
  let fixture: ComponentFixture<PostTweetComponent>;
  let tweetService: TweetService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostTweetComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [TweetService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              editMode: 'true'
            }),
            snapshot: new ActivatedRouteSnapshot()
          }
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTweetComponent);
    component = fixture.componentInstance;
    tweetService = TestBed.inject(TweetService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the form state', () => {
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    spyOn(tweetService.tweetContent, 'get').and.callThrough().and.returnValue("tweetContent");
    spyOn(tweetService.tweetTag, 'get').and.callThrough().and.returnValue("tweetTag");
    activatedRoute.queryParams = of({editMode: 'true'});
    component.ngOnInit();
    expect(component.editMode).toEqual(true);
    expect(component.tweetContent).toEqual('tweetContent');
    expect(component.tweetTag).toEqual('tweetTag');
  });

  it('should test the onCancel method', () => {
    let routerSpy = spyOn(router, 'navigate');
    let resetSpy = spyOn(component.addForm, 'reset');
    component.onCancel();
    expect(routerSpy).toHaveBeenCalled();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should check if form is valid', () => {
    component.addForm.setValue({
      content: 'content',
      tag: 'tag'
    });
    expect(component.addForm.valid).toBeTrue();
  });

  it('should check if form is invalid', () => {
    component.addForm.setValue({
      content: '',
      tag: ''
    });
    expect(component.addForm.invalid).toBeTrue();
  });

  it('should submit the form in add mode', fakeAsync(() => {
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    let tweetServiceSpy = spyOn(tweetService, 'postTweet').and.callThrough().and.returnValue(of(postTweetSuccessResponse));
    let subSpy = spyOn(tweetService.postTweet("user", JSON.stringify(mockTweet1)), 'subscribe').and.callThrough();
    let routerSpy = spyOn(router, 'navigate').and.callThrough();
    activatedRoute.queryParams = of({editMode: null});
    component.addForm.setValue({
      content: 'new Tweet',
      tag: 'tag'
    });
    component.onSubmit();
    tick(100);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(tweetServiceSpy).toHaveBeenCalled();
      expect(subSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalled();
    });
  }));

  it('should submit the form in update mode', fakeAsync(() => {
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    let tweetServiceSpy = spyOn(tweetService, 'updateTweet').and.callThrough().and.returnValue(of(postTweetSuccessResponse));
    let subSpy = spyOn(tweetService.updateTweet("user1", "tweet1", JSON.stringify(mockTweet1)), 'subscribe').and.callThrough();
    let routerSpy = spyOn(router, 'navigate').and.callThrough();
    activatedRoute.queryParams = of({editMode: 'true'});
    component.addForm.setValue({
      content: '',
      tag: ''
    });
    component.onSubmit();
    tick(100);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(tweetServiceSpy).toHaveBeenCalled();
      expect(subSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalled();
    });
  }));
});
