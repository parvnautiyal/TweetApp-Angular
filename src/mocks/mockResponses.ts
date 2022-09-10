import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {mockUser1, mockUserArray} from "./mockUsers";
import {User} from "../app/shared/models/user/user";
import {mockTweet1} from "./mockTweets";

let HTTP_STATUS_OK = 'OK';
let HTTP_STATUS_CREATED = 'Created';
let HTTP_STATUS_NOT_FOUND = 'Not Found';
let HTTP_STATUS_BAD_REQUEST = 'Bad Request';
let baseUrl = 'http://localhost:80/api/v1.0/tweets/';

const allUsersResponseSuccess = new HttpResponse({
  body: mockUserArray,
  status: 200,
  statusText: HTTP_STATUS_OK,
  headers: new HttpHeaders().append('Content-Type', 'application/json'),
  url: baseUrl + "users/all"
});

const userResponseSuccess = new HttpResponse({
  body: mockUser1,
  status: 200,
  statusText: HTTP_STATUS_OK,
  headers: new HttpHeaders().append('Content-Type', 'application/json'),
  url: baseUrl + "user/user1"
});

const allUsersResponseFail = new HttpResponse({
  body: new Array<User>(),
  status: 404,
  statusText: HTTP_STATUS_NOT_FOUND,
  headers: new HttpHeaders().append('Content-Type', 'application/json'),
  url: baseUrl + "users/all"
});

const forgotPasswordSuccessResponse = new HttpResponse({
  body: 'password succesfully changed',
  status: 200,
  statusText: HTTP_STATUS_OK,
  headers: new HttpHeaders().append('Content-Type', 'text'),
  url: baseUrl + "forgot"
});

const forgotPasswordFailResponse = new HttpResponse({
  body: 'invalid email',
  status: 404,
  statusText: HTTP_STATUS_OK,
  headers: new HttpHeaders().append('Content-Type', 'text'),
  url: baseUrl + "forgot"
});

const registerUserSuccessResponse = new HttpResponse({
  body: mockUser1,
  status: 201,
  statusText: HTTP_STATUS_CREATED,
  headers: new HttpHeaders().append('Content-Type', 'text'),
  url: baseUrl + "register"
});

const registerUserFailResponse = new HttpResponse({
  body: "error",
  status: 400,
  statusText: HTTP_STATUS_BAD_REQUEST,
  headers: new HttpHeaders().append('Content-Type', 'text'),
  url: baseUrl + "register"
});

const deleteTweetSuccessResponse = new HttpResponse({
  body: "tweet deleted",
  status: 200,
  statusText: HTTP_STATUS_OK,
  headers: new HttpHeaders().append('Content-Type', 'text'),
  url: baseUrl + "user/delete/tweet"
});

const likeTweetSuccessResponse = new HttpResponse({
  body: "tweet liked by user",
  status: 200,
  statusText: HTTP_STATUS_OK,
  headers: new HttpHeaders().append('Content-Type', 'text'),
  url: baseUrl + "user/like/tweet"
});

const dislikeTweetSuccessResponse = new HttpResponse({
  body: "tweet disliked by user",
  status: 200,
  statusText: HTTP_STATUS_OK,
  headers: new HttpHeaders().append('Content-Type', 'text'),
  url: baseUrl + "user/dislike/tweet"
});

const replyTweetSuccessResponse = new HttpResponse({
  body: "Replied by user",
  status: 200,
  statusText: HTTP_STATUS_OK,
  headers: new HttpHeaders().append('Content-Type', 'text'),
  url: baseUrl + "user/reply/tweet"
});

const postTweetSuccessResponse = new HttpResponse({
  body: mockTweet1,
  status: 201,
  statusText: HTTP_STATUS_CREATED,
  headers: new HttpHeaders().append('Content-Type', 'application/json'),
  url: baseUrl + "user/add"
});

export {
  allUsersResponseSuccess,
  allUsersResponseFail,
  forgotPasswordSuccessResponse,
  forgotPasswordFailResponse,
  registerUserSuccessResponse,
  registerUserFailResponse,
  deleteTweetSuccessResponse,
  likeTweetSuccessResponse,
  dislikeTweetSuccessResponse,
  replyTweetSuccessResponse,
  postTweetSuccessResponse,
  userResponseSuccess
};
