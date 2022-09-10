import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../../shared/models/user/user";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpService: HttpClient) {
  }

  public registerUser(user: User) {
    return this.httpService.post(environment.baseUrl + "register", user, {observe: "response"});
  }

  public login(username: string, password: string) {
    let params = new HttpParams().set("username", username).set("password", password);
    return this.httpService.get(environment.baseUrl + "login", {
      params: params,
      observe: "response",
      responseType: "text"
    });
  }

  public forgotPassword(email: string, newPassword: string) {
    let params = new HttpParams().set("newPassword", newPassword).set("email", email);
    return this.httpService.get(environment.baseUrl + "forgot", {
      params: params,
      observe: "response",
      responseType: "text"
    });
  }

  public getAllUsers() {
    return this.httpService.get<User[]>(environment.baseUrl + "users/all", {observe: "response"});
  }

  public getUser(username: string) {
    return this.httpService.get<User>(environment.baseUrl + "user/" + username, {observe: "response"});
  }

  public getAllTweets() {
    return this.httpService.get<any>(environment.baseUrl + "all", {observe: "response"});
  }

  showTweetsByUser(username: string) {
    return this.httpService.get<any>(environment.baseUrl + username, {observe: "response"});
  }

  public postTweet(username: string, tweet: any) {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.httpService.post(environment.baseUrl + username + "/add", tweet, {
      observe: "response",
      headers: headers
    });
  }

  public likeTweet(username: string, tweetId: string) {
    return this.httpService.put(environment.baseUrl + username + '/like/' + tweetId, null, {
      observe: "response",
      responseType: "text"
    });
  }

  public dislikeTweet(username: string, tweetId: string) {
    return this.httpService.put(environment.baseUrl + username + '/dislike/' + tweetId, null, {
      observe: "response",
      responseType: "text"
    });
  }

  public deleteTweet(username: string, tweetId: string) {
    return this.httpService.delete(environment.baseUrl + username + '/delete/' + tweetId, {
      observe: "response",
      responseType: "text"
    });
  }

  public replyTweet(username: string, tweetId: string, reply: string) {
    let headers = new HttpHeaders().append('Content-Type', 'text/plain');
    return this.httpService.post(environment.baseUrl + username + '/reply/' + tweetId, reply, {
      observe: "response",
      responseType: "text",
      headers: headers
    });
  }

  putTweet(username: string, tweetId: string, tweet: any) {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.httpService.put(environment.baseUrl + username + "/edit/" + tweetId, tweet, {
      observe: "response",
      headers: headers
    });
  }
}
