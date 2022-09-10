import {TestBed} from '@angular/core/testing';

import {HttpService} from './http.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {mockUser1, mockUserArray} from "../../../mocks/mockUsers";
import {mockTweet1, mockTweet2, mockTweetArray} from "../../../mocks/mockTweets";
import {Tweet} from "../../shared/models/tweet/tweet";

describe('HttpService', () => {
  let service: HttpService;
  let httpController: HttpTestingController;
  let baseUrl = 'http://localhost:80/api/v1.0/tweets/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllUsers and return an array of Users', () => {
    service.getAllUsers().subscribe((res) => {
      expect(res.body).toEqual(mockUserArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseUrl}users/all`,
    });

    req.flush(mockUserArray);
  });

  it('should call getUser and return the user', () => {
    service.getUser("user").subscribe((res) => {
      expect(res.body).toEqual(mockUser1);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseUrl}user/user`,
    });

    req.flush(mockUser1);
  });

  it('should call registerUser and return the user', () => {
    service.registerUser(mockUser1).subscribe((res) => {
      expect(res.body).toEqual(mockUser1);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${baseUrl}register`,
    });

    req.flush(mockUser1);
  });

  it('should call login and return the response', () => {
    service.login(mockUser1.userName, mockUser1.password).subscribe(res => {
      expect(res.body).toEqual(`Login Successful for ${mockUser1.userName}`);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseUrl}login?username=${mockUser1.userName}&password=${mockUser1.password}`,
    });

    req.flush(`Login Successful for ${mockUser1.userName}`);
  });

  it('should call forgotPassword and return the response', () => {
    service.forgotPassword(mockUser1.email, "NewPassword").subscribe(res => {
      expect(res.body).toEqual(`Password successfully changed for user ${mockUser1.userName}`);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseUrl}forgot?newPassword=NewPassword&email=${mockUser1.email}`,
    });

    req.flush(`Password successfully changed for user ${mockUser1.userName}`);
  });

  it('should call getAllTweets and return an array of Tweets', () => {
    service.getAllTweets().subscribe((res) => {
      expect(res.body).toEqual(mockTweetArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseUrl}all`,
    });

    req.flush(mockTweetArray);
  });

  it('should call showTweetsByUser and return an array of Tweets', () => {
    service.showTweetsByUser(mockTweet1.username).subscribe((res) => {
      expect(res.body).toEqual(Array.of(mockTweet1));
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseUrl}${mockTweet1.username}`,
    });

    req.flush(Array.of(mockTweet1));
  });

  it('should call postTweet and return tweet', () => {
    service.postTweet(mockTweet1.username, mockTweet1).subscribe(res => {
      expect(res.body).toEqual(mockTweet1);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${baseUrl}${mockTweet1.username}/add`,
    });

    req.flush(mockTweet1);
  });

  it('should call likeTweet and return response', () => {
    service.likeTweet(mockTweet2.username, mockTweet1.id).subscribe(res => {
      expect(res.body).toEqual(`Post liked by user ${mockTweet2.username}`);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${baseUrl}${mockTweet2.username}/like/${mockTweet1.id}`,
    });

    req.flush(`Post liked by user ${mockTweet2.username}`);
  });

  it('should call dislikeTweet and return response', () => {
    service.dislikeTweet(mockTweet2.username, mockTweet1.id).subscribe(res => {
      expect(res.body).toEqual(`Post disliked by user ${mockTweet2.username}`);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${baseUrl}${mockTweet2.username}/dislike/${mockTweet1.id}`,
    });

    req.flush(`Post disliked by user ${mockTweet2.username}`);
  });

  it('should call replyTweet and return response', () => {
    service.replyTweet(mockTweet2.username, mockTweet1.id, "replied").subscribe(res => {
      expect(res.body).toEqual(`Post replied by user ${mockTweet2.username}`);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${baseUrl}${mockTweet2.username}/reply/${mockTweet1.id}`,
    });

    req.flush(`Post replied by user ${mockTweet2.username}`);
  });

  it('should call deleteTweet and return response', () => {
    service.deleteTweet(mockTweet1.username, mockTweet1.id).subscribe(res => {
      expect(res.body).toEqual(`Tweet with id ${mockTweet1.id} deleted`);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${baseUrl}${mockTweet1.username}/delete/${mockTweet1.id}`,
    });

    req.flush(`Tweet with id ${mockTweet1.id} deleted`);
  });

  it('should call putTweet and return updated tweet', () => {

    const updatedTweet: Tweet = new Tweet('tweet1', 'username1', 'content updated', "tag", new Date("2022-08-02"), null, null);

    service.putTweet(mockTweet1.username, mockTweet1.id, updatedTweet).subscribe(res => {
      expect(res.body).toEqual(updatedTweet);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${baseUrl}${mockTweet1.username}/edit/${mockTweet1.id}`,
    });

    req.flush(updatedTweet);

  });
});
